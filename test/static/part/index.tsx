import * as React from 'react';
import { reactselect, reactselectasync } from './reactselect';
import { reactdatepicker } from './reactdatepicker';
import { types, CaseInput } from '../../../src';

let TextAreaCaseInput = React.forwardRef((props, ref) => <textarea {...props} ref={ref} />);
let customPartSet: types.Part.CustomPartSet = {
    "text": {
        Component: ({ name, readonly, value, label, error, placeholder, required, hidden,
            uppercase, lowercase,
            onChange }) => {
            if (hidden) {
                return <input type="hidden" name={name} value={value} />
            }
            let requiredSign = required ? <span className="text-danger">*</span> : <></>;
            return <div className="form-floating">
                <CaseInput type="text" className={"form-control rounded-0 " + (error ? "is-invalid" : "")} name={name}
                    value={value} readOnly={readonly} placeholder={placeholder}
                    uppercase={uppercase} lowercase={lowercase}
                    onChange={onChange} />
                {label &&
                    <label>{label}&nbsp;{requiredSign}</label>
                }
                {error &&
                    <div className="invalid-feedback">
                        {error}
                    </div>
                }
            </div>;
        }
    },
    "textarea": {
        Component: ({ name, readonly, value, label, error, placeholder, required, hidden,
            uppercase, lowercase,
            onChange }) => {
            let requiredSign = required ? <span className="text-danger">*</span> : <></>;
            let className = "form-control rounded-0 " + (error ? "is-invalid" : "");

            return <div className="form-floating ">
                <CaseInput className={className} name={name} inputComponent={<TextAreaCaseInput />}
                    value={value} readOnly={readonly} placeholder={placeholder}
                    style={{
                        height: "10em"
                    }}
                    uppercase={uppercase} lowercase={lowercase}
                    onChange={onChange} />
                {label &&
                    <label>{label}&nbsp;{requiredSign}</label>
                }
                {error &&
                    <div className="invalid-feedback">
                        {error}
                    </div>
                }
            </div>;
        }
    },
    "number": {
        Component: ({ name, readonly, value, label, error, placeholder, required,
            onChange }) => {
            let requiredSign = required ? <span className="text-danger">*</span> : <></>;
            return <div className="form-floating">
                <input type="text" className={"form-control rounded-0 " + (error ? "is-invalid" : "")} name={name}
                    value={value} readOnly={readonly} placeholder={placeholder}
                    onChange={onChange} />
                {label &&
                    <label>{label}&nbsp;{requiredSign}</label>
                }
                {error &&
                    <div className="invalid-feedback">
                        {error}
                    </div>
                }
            </div>;
        }
    },
    "checkbox": {
        Component: ({ name, readonly, value, label, error, placeholder, onChange }) => {
            return <div className="form-check form-switch">
                <label className="form-check-label" >
                    <input className="form-check-input" type="checkbox" name={name} checked={value} onChange={onChange} />
                    {label}
                </label>
            </div>;
        }
    },
    "select": {
        Component: ({ name, readonly, value, label, error, placeholder, options, groupedOptions, required,
            onChange }) => {
            if (readonly) {
                let selectText = (options as any[]).find(k => k.value == value)?.label;
                return <div className="form-floating">
                    <input type="text" className={"form-control rounded-0 "}
                        value={selectText} readOnly={true} placeholder={placeholder}
                        onChange={onChange} />
                    <input type="hidden" name={name} value={value} />
                    {label &&
                        <label>{label}</label>
                    }
                </div>;
            } else {
                let requiredSign = required ? <span className="text-danger">*</span> : <></>;
                return <div className="form-floating">
                    <select className={"form-control rounded-0 " + (error ? "is-invalid" : "")} name={name} value={value}
                        onChange={onChange}>
                        {(options as any[]).map(k => <option value={k.value} key={k.value ?? k.label}>{k.label}</option>)}
                    </select>
                    {label &&
                        <label>{label}&nbsp;{requiredSign}</label>
                    }
                    {error &&
                        <div className="invalid-feedback">
                            {error}
                        </div>
                    }
                </div>;
            }
        },
    },
    "button": {
        Component: ({ onClick, label, type }) => {
            return <button className={"btn rounded-0 btn-" + type} onClick={onClick}>{label}</button>;
        }
    },
    reactdatepicker, reactselect, reactselectasync
};

export default customPartSet;