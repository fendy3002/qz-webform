import * as React from 'react';
/**
 * @module Components
 */

export interface CaseInputProp {
    uppercase?: boolean,
    lowercase?: boolean,
    onChange?: (evt: any) => (void | any),
    inputComponent?: React.ForwardRefExoticComponent<React.RefAttributes<unknown>>,
    [key: string]: any
}
let BaseHTMLInput = React.forwardRef((props, ref) => <input {...props} ref={ref} />)
/**
 * @class CaseInput, a react component to enable case-transforming input
 */
export class CaseInput extends React.Component<CaseInputProp, any> {
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
        let { uppercase, lowercase, onChange, inputComponent, ...renderedProps } = this.props;
        let InputComponent = this.props.inputComponent ?? BaseHTMLInput;
        let InputComponentProps = {
            onChange: this.onChange
        };
        return <InputComponent {...renderedProps} {...InputComponentProps} ref={(ref) => this.inputRef = ref} />;
    }
}