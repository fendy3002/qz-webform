import * as React from 'react';
import WebFormConstruct from './WebForm';
import validateInputConstruct from '../helper/validateInput';

let construct = (template, lang) => {
    const WebForm = WebFormConstruct(template);
    const validateInput = validateInputConstruct(lang);
    return class StaticWebForm extends React.Component {
        constructor(prop) {
            super(prop);
            this.state = {
                data: this.props.data,
                error: {}
            };
            [
                "onChange",
            ].forEach((handler) => {
                this[handler] = this[handler].bind(this);
            });
        }
        onChange(evt) {
            const { name, value } = evt.currentTarget ?? evt.target ?? {};
            let validateResult = validateInput.validate(evt);

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
        render() {
            let { elements } = this.props;
            return <WebForm elements={elements}
                data={this.state.data}
                error={this.state.error}
                onChange={this.onChange} />
        }
    };
}
export default construct;