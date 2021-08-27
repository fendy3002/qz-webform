import * as React from 'react';
import WebFormConstruct from './WebForm';
import inputValidatorConstruct from '../validator/inputValidator';

let construct = ({ template, structure, context, language }) => {
    const WebForm = WebFormConstruct(template);
    const inputValidator = inputValidatorConstruct(context, language);
    class ReactWebForm extends React.Component<any, any> {
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
            let validateResult = inputValidator.validate(evt);
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
                onChange({
                    data: {
                        ...data,
                        ...validateResult.value.data
                    },
                    error: {
                        ...error,
                        ...validateResult.value.error
                    }
                });
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

    return ReactWebForm as any;
}
export default construct;