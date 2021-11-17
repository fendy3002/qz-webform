import { observable, toJS, makeAutoObservable, makeObservable } from 'mobx';
import * as React from 'react';
import {
    elementBuilder,
    FullColumn, RowBreak, HR, Cell,
    dataValidator
} from '../../../src';
import parts from '../part';

const fixedOption = [
    {
        label: "-- SELECT ONE --",
        value: ""
    },
    {
        label: "Indonesia",
        value: "id"
    }, {
        label: "United States",
        value: "us"
    }
];

export class homeStore {
    constructor() {
        // makeObservable(this, {
        //     data: observable,
        //     error: observable
        // });
        makeAutoObservable(this);
        let builtElement = elementBuilder([
            FullColumn({
                tagName: "h",
                props: {
                    level: 2,
                    text: "ReadOnly Configuration"
                },
            }),
            {
                tagName: "checkbox",
                props: {},
                validation: {
                    editable: true
                },
                name: "readonly"
            },
            {
                tagName: "button",
                props: {
                    label: "Toggle Readonly",
                    type: "primary"
                },
                validation: {
                    editable: true
                },
                context: {
                    onClick: (evt, { data, onChange }) => {
                        onChange({
                            data: {
                                readonly: !data.readonly
                            }
                        })
                    }
                }
            }, RowBreak(),
            FullColumn({
                tagName: "h",
                props: {
                    level: 2,
                    text: "Input Text"
                },
            }),
            {
                tagName: "text",
                props: {},
                name: "Name",
            },
            {
                tagName: "text",
                props: {
                    uppercase: true,
                    label: "Name (uppercase)"
                },
                name: "Name",
            },
            {
                tagName: "text",
                props: {
                    label: "Name (required)"
                },
                name: "Name",
                validation: {
                    required: true
                }
            },
            {
                tagName: "text",
                props: {
                    label: "Name (readonly)"
                },
                name: "Name",
                validation: {
                    readonly: true
                }
            },
            {
                tagName: "text",
                props: {
                    label: "Name (editable)"
                },
                name: "Name",
                validation: {
                    editable: true
                }
            },
            {
                tagName: "text",
                props: {
                    label: "Name (minlength = 3)"
                },
                name: "Name",
                validation: {
                    editable: true,
                    minlength: 3
                }
            },
            FullColumn({
                tagName: "h",
                props: {
                    level: 2,
                    text: "Textarea"
                },
            }),
            FullColumn({
                tagName: "textarea",
                props: {
                    label: "Address (fullcolumn)"
                },
                name: "Address"
            }),
            {
                tagName: "textarea",
                props: {
                    label: "Address"
                },
                name: "Address"
            },
            {
                tagName: "textarea",
                props: {
                    label: "Address (uppercase)",
                    uppercase: true
                },
                name: "Address"
            },
            {
                tagName: "textarea",
                props: {
                    label: "Address (required)"
                },
                name: "Address",
                validation: {
                    required: true
                }
            },
            {
                tagName: "textarea",
                props: {
                    label: "Address (readonly)"
                },
                name: "Address",
                validation: {
                    readonly: true
                }
            },
            FullColumn({
                tagName: "h",
                props: {
                    level: 2,
                    text: "Number"
                },
            }),
            {
                tagName: "number",
                props: {
                    label: "Height"
                },
                name: "Height",
            },
            {
                tagName: "number",
                props: {
                    label: "Height (required)"
                },
                name: "Height",
                validation: {
                    required: true
                }
            },
            {
                tagName: "number",
                props: {
                    label: "Height (min = 3)"
                },
                name: "Height",
                validation: {
                    min: 3
                }
            },
            {
                tagName: "number",
                props: {
                    label: "Height (readonly)"
                },
                name: "Height",
                validation: {
                    readonly: true
                }
            },

            FullColumn({
                tagName: "h",
                props: {
                    level: 2,
                    text: "Select"
                },
            }),
            {
                tagName: "select",
                props: {},
                name: "Country",
                context: {
                    options: fixedOption
                }
            },
            {
                tagName: "select",
                props: {
                    label: "Country (required)"
                },
                name: "Country",
                context: {
                    options: fixedOption
                },
                validation: { required: true }
            },
            {
                tagName: "select",
                props: {
                    label: "Country (readonly)"
                },
                name: "Country",
                context: {
                    options: fixedOption
                },
                validation: { readonly: true }
            },
            FullColumn({
                tagName: "h",
                props: {
                    level: 2,
                    text: "Button"
                },
            }),
            Cell([
                {
                    tagName: "button",
                    props: {
                        label: "+ height",
                        type: "outline-primary"
                    },
                    context: {
                        onClick: (evt, { data, onChange }) => {
                            let currentHeight = parseFloat((data.Height ?? "") == "" ? "0" : data.Height);
                            onChange({
                                data: {
                                    Height: (currentHeight + 1).toString()
                                }
                            })
                        }
                    },
                },
                {
                    tagName: "button",
                    props: {
                        label: "- height",
                        type: "outline-danger"
                    },
                    context: {
                        onClick: (evt, { data, onChange }) => {
                            let currentHeight = parseFloat((data.Height ?? "") == "" ? "0" : data.Height);
                            onChange({
                                data: {
                                    Height: (currentHeight - 1).toString()
                                }
                            })
                        }
                    },
                },
            ]),

            FullColumn({
                tagName: "h",
                props: {
                    level: 2,
                    text: "Custom"
                },
            }),
            FullColumn({
                tagName: "custom",
                props: {},
                context: {
                    Component: ({ data, error }) => (<>
                        <code>This is the custom component, the data below is stringified data with error on the side</code>
                        <div className="row">
                            <div className="col-md-6">
                                <pre><code>{JSON.stringify(data, null, 2)}</code></pre>
                            </div>
                            <div className="col-md-6">
                                <pre><code>{JSON.stringify(error, null, 2)}</code></pre>
                            </div>
                        </div>
                    </>)
                },
            }),

            FullColumn({
                tagName: "h",
                props: {
                    level: 2,
                    text: "ETC"
                },
            }),
            {
                tagName: "checkbox",
                props: {},
                name: "HasJob"
            },
            HR(),
            Cell([{
                tagName: "button",
                props: {
                    type: "primary",
                    label: "Submit"
                },
                context: {
                    onClick: (evt, { data, onChange }) => {
                        this.onSubmit();
                    }
                }
            }])
        ]).withAutoGrid().build(toJS(this.data));
        this.Elements = builtElement.Elements;
        this.data = builtElement.data;

        [
            "onChange",
            "onSubmit"
        ].forEach(handler => {
            this[handler] = this[handler].bind(this);
        });
    }
    data = {
        readonly: false
    };
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
    onSubmit() {
        let validateResult = dataValidator(parts)(this.Elements, this.data);
        this.error = {
            ...this.error,
            ...validateResult.object()
        };
    }
};