import * as React from 'react';

export class CaseInput extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    selectionStart = null;
    selectionEnd = null;
    inputRef = null;

    onChange(evt) {
        let { selectionStart, selectionEnd } = evt.currentTarget;
        this.selectionStart = selectionStart;
        this.selectionEnd = selectionEnd;
        if (this.props.uppercase) {
            evt.currentTarget.value = evt.currentTarget.value.toUpperCase();
        } else if (this.props.lowercase) {
            evt.currentTarget.value = evt.currentTarget.value.toLowerCase();
        }
        this.props.onChange?.(evt);
    }
    componentDidUpdate() {
        if (this.props.uppercase || this.props.lowercase) {
            this.inputRef?.setSelectionRange(this.selectionStart, this.selectionEnd);
        }
    }
    render() {
        let {uppercase, lowercase, onChange, ...renderedProps} = this.props;
        return <input {...renderedProps} onChange={this.onChange} ref={(ref) => this.inputRef = ref} />;
    }
}