import * as React from 'react';
import * as mobxReact from 'mobx-react';
import { toJS } from 'mobx';
let { observer, inject } = mobxReact;
import WebFormConstruct from './WebForm';
import inputValidatorConstruct from '../validator/inputValidator';

let construct = ({ template, structure, context, language, staticOnChange }) => {
    const WebForm = WebFormConstruct(template);
    const inputValidator = inputValidatorConstruct(context, language);

    let componentOnChange = staticOnChange ? ((newData, prev) => {
        let result = staticOnChange(newData, {
            ...prev,
            data: toJS(prev.data),
            error: toJS(prev.error)
        });
        return result ?? newData;
    }) : ((newData) => newData);
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
                    return componentOnChange({
                        ...prev,
                        data: {
                            ...prev.data,
                            [name]: validateResult.value?.value,
                            [labelfield]: validateResult.value?.label
                        },
                        error: {
                            ...prev.error,
                            ...validateResult.error
                        }
                    }, prev);
                });
            } else if (dataset?.["tagname"] == "button") {
                onChange((prev) => {
                    return componentOnChange({
                        ...prev,
                        data: {
                            ...prev.data,
                            ...validateResult.value.data,
                        },
                        error: {
                            ...prev.error,
                            ...validateResult.value.error
                        }
                    }, prev);
                });
            } else {
                onChange((prev) => {
                    return componentOnChange({
                        ...prev,
                        data: {
                            ...prev.data,
                            [name]: validateResult.value,
                        },
                        error: {
                            ...prev.error,
                            ...validateResult.error
                        }
                    }, prev);
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