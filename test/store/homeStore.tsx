import { observable, toJS, makeAutoObservable, makeObservable } from 'mobx';
import { elementBuilder } from '../../src/helper/elementBuilder';
import { FullColumn, RowBreak, HR } from '../../src/helper/builderTools';

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
                name: "Name",
                validation: {
                    required: true
                }
            }, RowBreak(),
            {
                tagName: "checkbox",
                props: {},
                name: "HasJob"
            },
            {
                tagName: "select",
                props: {},
                name: "Country",
                context: {
                    options: [{
                        label: "Indonesia",
                        value: "id"
                    }, {
                        label: "United States",
                        value: "us"
                    }]
                }
            },
            HR(),
            FullColumn({
                tagName: "textarea",
                props: {},
                name: "Address"
            }),
        ]).withAutoGrid().build(toJS(this.data));
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
        this.data = {
            ...this.data,
            ...data
        };
        this.error = {
            ...this.error,
            ...error
        };

        console.log(toJS(this.data), toJS(this.error))
    }
};