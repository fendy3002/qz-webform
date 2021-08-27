import * as React from 'react';
import WebFormConstruct from './WebForm';
import inputValidatorConstruct from '../validator/inputValidator';

let construct = ({ template, structure, data, context, language }) => {
    const WebForm = WebFormConstruct(template);
    const inputValidator = inputValidatorConstruct(context, language);
    class StaticWebForm extends React.Component<any, any> {
        constructor(prop) {
            super(prop);
            this.state = {
                data: data,
                error: {}
            };
            [
                "onChange",
            ].forEach((handler) => {
                this[handler] = this[handler].bind(this);
            });
        }
        onChange(evt) {
            const { name, value, dataset } = evt.currentTarget ?? evt.target ?? {};
            let validateResult = inputValidator.validate(evt);
            if (dataset?.["tagname"] == "reactselectasync") {
                const { labelfield } = evt.currentTarget ?? evt.target;
                this.setState((prev) => {
                    return {
                        ...prev,
                        data: {
                            ...prev.data,
                            [name]: validateResult.value.value,
                            [labelfield]: validateResult.value.label
                        },
                        error: {
                            ...prev.error,
                            ...validateResult.error
                        }
                    };
                });
            } else if (dataset?.["tagname"] == "button") {
                this.setState((prev) => {
                    return {
                        ...prev,
                        data: {
                            ...prev.data,
                            ...validateResult.value.data,
                        },
                        error: {
                            ...prev.error,
                            ...validateResult.value.error
                        }
                    };
                });
            } else {
                this.setState((prev) => {
                    return {
                        ...prev,
                        data: {
                            ...prev.data,
                            [name]: validateResult.value,
                        },
                        error: {
                            ...prev.error,
                            ...validateResult.error
                        }
                    };
                });
            }
        }
        render() {
            return <WebForm structure={structure}
                data={this.state.data}
                error={this.state.error}
                context={context}
                onChange={this.onChange} />
        }
    };
    return StaticWebForm as any;
}
export default construct;