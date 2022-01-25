import * as React from 'react';
/**
 * @module Components
 */

export interface CaseInputProp {
    uppercase?: boolean,
    lowercase?: boolean,
    onChange?: (evt: any) => (void | any),
    inputComponent?: React.ReactElement,
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
        this.inputRef = React.createRef();
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
            this.inputRef?.current.setSelectionRange(this.selectionStart, this.selectionEnd);
        }
    }
    render() {
        let { uppercase, lowercase, onChange, inputComponent, ...renderedProps } = this.props;
        let baseInputComponent = this.props.inputComponent ?? <BaseHTMLInput />;

        const InputComponent = React.cloneElement(
            baseInputComponent,
            {
                ref: this.inputRef,
                onChange: this.onChange,
                ...renderedProps
            }
        );
        return InputComponent;
    }
}