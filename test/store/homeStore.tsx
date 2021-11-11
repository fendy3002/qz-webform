import { observable, toJS, makeObservable } from 'mobx';
import { elementBuilder } from '../../src/helper/elementBuilder';
export class homeStore {
    constructor() {
        makeObservable(this);
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
    @observable
    data = {};
    @observable
    error = {};

    Elements = [];
    onChange({ data, error }) {
        this.data = data;
        this.error = error;
    }
};