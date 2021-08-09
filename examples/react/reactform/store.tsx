import * as sa from 'superagent';
import { observable, toJS, makeObservable } from 'mobx';

let getUserUrl = `https://jsonplaceholder.typicode.com/users/{userid}`;
export default class store {
    constructor(userid) {
        [
            "onFormChange",
        ].forEach((handler) => {
            this[handler] = this[handler].bind(this);
        });

        this.userid = userid;
        makeObservable(this);
        sa.get(getUserUrl.replace(`{userid}`, userid)).then((resp) => {
            this.user = resp.body;
        });
    }

    userid = "";
    @observable
    user: any = {};
    
    onFormChange(newUser, evt) {
        this.user = newUser;
    }
};