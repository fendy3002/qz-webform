import * as React from 'react';
import WebFormConstruct from './WebForm';
import validateInputConstruct from '../helper/validateInput';

let construct = ({ template, elements, language }) => {
    const WebForm = WebFormConstruct(template);
    const validateInput = validateInputConstruct(lang);
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
            const { name, value } = evt.currentTarget ?? evt.target ?? {};
            let validateResult = validateInput.validate(evt);
            const { onChange, data, error } = this.props;
            onChange({
                data: {
                    ...data,
                    [name]: validateResult.value,
                },
                error: {
                    ...error,
                    ...validateResult.error
                }
            });
        }
        render() {
            let { data, error } = this.props;
            return <WebForm elements={elements}
                data={data}
                error={error}
                onChange={this.onChange} />
        }
    };
}
export default construct;