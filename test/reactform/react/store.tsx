import * as sa from 'superagent';
import { observable, toJS, makeObservable } from 'mobx';

let getUserUrl = `https://jsonplaceholder.typicode.com/users/{userid}`;
let instituteData = [
    { value: "001", label: "Hettinger-Bruen" },
    { value: "002", label: "Schuppe, Bechtelar and Cronin" },
    { value: "003", label: "Witting, O'Kon and Spencer" },
    { value: "004", label: "Lang-Reichel" },
    { value: "005", label: "Johns Group	" },
];
export default class store {
    constructor(userid) {
        [
            "onFormChange",
            "searchInstitute",
            "validateData"
        ].forEach((handler) => {
            this[handler] = this[handler].bind(this);
        });

        this.userid = userid;
        makeObservable(this);
        sa.get(getUserUrl.replace(`{userid}`, userid)).then((resp) => {
            this.user = {
                ...resp.body,
                // example select async
                instituteKey: "",
                instituteName: "",
                title: ""
            };
        });
    }

    userid = "";
    @observable
    user: any = null;
    @observable
    error: any = {};
    dataValidator: any = null;

    onFormChange({ data, error }, evt) {
        this.user = data;
        this.error = error;
    }

    searchInstitute(inputValue, callback) {
        setTimeout(() => {
            let searchResult = instituteData.filter(k =>
                k.label.toLowerCase().includes(inputValue.toLowerCase())
            );
            callback(searchResult);
        }, 1000);
    }

    validateData() {
        let error = this.dataValidator.validate(this.user).object();
        this.error = {
            ...this.error,
            ...error
        };
    }
};