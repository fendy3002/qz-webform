import { observable, toJS, makeAutoObservable, makeObservable } from 'mobx';
import { elementBuilder } from '../../src/helper/elementBuilder';
export class homeStore {
    constructor() {
        // makeObservable(this, {
        //     data: observable,
        //     error: observable
        // });
        makeAutoObservable(this);
        let builtElement = elementBuilder([
            {
                tagName: "text",
                props: {},
                name: "Name"
            }
        ]).withAutoGrid().build(toJS(this.data));
        console.log("builtElement.data", builtElement.data);
        this.Elements = builtElement.Elements;
        this.data = builtElement.data;

        [
            "onChange"
        ].forEach(handler => {
            this[handler] = this[handler].bind(this);
        });
    }
    data = {};
    error = {};

    Elements: any[] = [];
    onChange({ data, error }) {
        this.data = data;
        this.error = error;
    }
};