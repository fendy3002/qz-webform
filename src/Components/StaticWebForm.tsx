import * as React from 'react';
import WebFormConstruct from './WebForm';

let construct = (template) => {
    const WebForm = WebFormConstruct(template);
    return class StaticWebForm extends React.Component {
        constructor(prop) {
            super(prop);
            this.state = {
                data: this.props.data
            };
            [
                "onChange",
            ].forEach((handler) => {
                this[handler] = this[handler].bind(this);
            });
        }
        onChange(evt) {
            const { name, value } = evt.currentTarget ?? evt.target ?? {};
            let tagName = evt.currentTarget.dataset["tagname"];

            this.setState((prev) => {
                return {
                    ...prev,
                    data: {
                        ...prev.data,
                        [name]: value
                    }
                };
            });
        }
        render() {
            let { elements } = this.props;
            return <WebForm elements={elements} onChange={this.onChange} data={this.state.data} />
        }
    };
}
export default construct;