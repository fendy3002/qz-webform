import * as React from 'react';
import * as mobxReact from 'mobx-react';
let { observer, inject } = mobxReact;
import WebFormConstruct from './WebForm';
import inputValidatorConstruct from '../validator/inputValidator';

let construct = ({ template, structure, context, language }) => {
    const WebForm = WebFormConstruct(template);
    const inputValidator = inputValidatorConstruct(context, language);
    class StaticWebForm extends React.Component<any, any> {
        constructor(prop) {
            super(prop);
            [
                "onChange",
            ].forEach((handler) => {
                this[handler] = this[handler].bind(this);
            });
        }
        onChange(evt) {
            let store = this.props.store;
            let { onChange } = store;
            const { name, value, dataset } = evt.currentTarget ?? evt.target ?? {};
            let validateResult = inputValidator.validate(evt);
            if (dataset?.["tagname"] == "reactselectasync") {
                const { labelfield } = evt.currentTarget ?? evt.target;
                onChange((prev) => {
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
                onChange((prev) => {
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
                onChange((prev) => {
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
            let store = this.props.store;
            let { data, error } = store;
            return <WebForm structure={structure}
                data={data}
                error={error}
                context={context}
                onChange={this.onChange} />
        }
    };
    return inject("store")(
        observer(StaticWebForm)
    ) as any;
}
export default construct;