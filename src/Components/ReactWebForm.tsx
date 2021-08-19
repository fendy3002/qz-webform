import * as React from 'react';
import WebFormConstruct from './WebForm';
import validateInputConstruct from '../helper/validateInput';

let construct = ({ template, structure, context, language }) => {
    const WebForm = WebFormConstruct(template);
    const validateInput = validateInputConstruct(context, language);
    return class ReactWebForm extends React.Component {
        constructor(prop) {
            super(prop);
            [
                "onChange",
            ].forEach((handler) => {
                this[handler] = this[handler].bind(this);
            });
        }
        onChange(evt) {
            const { name, value, dataset } = evt.currentTarget ?? evt.target ?? {};
            let validateResult = validateInput.validate(evt);
            const { onChange, data, error } = this.props;
            if (dataset?.["tagname"] == "reactselectasync") {
                const { labelfield } = evt.currentTarget ?? evt.target;
                onChange({
                    data: {
                        ...data,
                        [name]: validateResult.value.value,
                        [labelfield]: validateResult.value.label
                    },
                    error: {
                        ...error,
                        ...validateResult.error
                    }
                }, evt);
            } else if (dataset?.["tagname"] == "button") {
                if (name == "data") {
                    onChange({
                        data: {
                            ...data,
                            ...validateResult.value
                        },
                    });
                } else {
                    onChange({
                        error: {
                            ...error,
                            ...validateResult.value
                        }
                    });
                }
            } else {
                onChange({
                    data: {
                        ...data,
                        [name]: validateResult.value,
                    },
                    error: {
                        ...error,
                        ...validateResult.error
                    }
                }, evt);
            }
        }
        render() {
            let { data, error } = this.props;
            return <WebForm structure={structure}
                data={data}
                error={error}
                context={context}
                onChange={this.onChange} />
        }
    };
}
export default construct;