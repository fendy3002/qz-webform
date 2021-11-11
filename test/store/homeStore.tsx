import { observable, toJS, makeObservable } from 'mobx';
import { elementBuilder } from 'qz-webform';
export class homeStore {
    constructor() {
        makeObservable(this, {
            data: observable,
            error: observable
        });
        let builtElement = elementBuilder([
            {
                tagName: "text",
                props: {},
                name: "Name"
            }
        ]).withAutoGrid().build(this.data);
        this.Elements = builtElement.Elements;
        this.data = builtElement.data;
    }
    data = observable({});
    error = observable({});

    Elements: any[] = [];
    onChange({ data, error }) {
        this.data = data;
        this.error = error;
    }
};