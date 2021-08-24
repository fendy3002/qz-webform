import React from 'react';
import ReactSelect from 'react-select';
import ReactSelectAsync from 'react-select/async';
import ReactSelectBootstrapStyle from './ReactSelectBootstrapStyle';

import DatePicker from "react-datepicker";
import * as dayjs from 'dayjs';
import "react-datepicker/dist/react-datepicker.css";

const ReactDatepickerCustomInput = React.forwardRef((props: any, ref) => {
    let { value, label, validation, placeholder, isClearable,
        onChange, onClick } = props;
    let requiredSign = validation.required ? <span className="text-danger">*</span> : <></>;
    let clearOnClick = (evt) => {
        return onChange({
            target: {
                value: ""
            }
        });
    };
    return <>
        <div className="form-floating input-group">
            <input type="text" className={"form-control rounded-0 "}
                value={value} ref={ref} placeholder={placeholder}
                onChange={onChange}
                onClick={onClick}></input>
            {label &&
                <label style={{ zIndex: 3 }}>{label}&nbsp;{requiredSign}</label>
            }
            {isClearable &&
                <button className="btn btn-outline-secondary rounded-0" type="button" onClick={clearOnClick}>x</button>
            }
        </div>
    </>
});

export default {
    "text": ({ name, readonly, value, label, error, placeholder, dataset, validation,
        onChange }) => {
        let requiredSign = validation.required ? <span className="text-danger">*</span> : <></>;
        return <div className="form-floating">
            <input type="text" className={"form-control rounded-0 " + (error ? "is-invalid" : "")} name={name}
                value={value} readOnly={readonly} placeholder={placeholder} {...dataset}
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
    },
    "textarea": ({ name, readonly, value, label, error, placeholder, dataset, validation,
        onChange }) => {
        let requiredSign = validation.required ? <span className="text-danger">*</span> : <></>;
        return <div className="form-floating">
            <textarea className={"form-control rounded-0 " + (error ? "is-invalid" : "")} name={name}
                value={value} readOnly={readonly} placeholder={placeholder} {...dataset}
                style={{
                    height: "10em"
                }}
                onChange={onChange}></textarea>
            {label &&
                <label>{label}&nbsp;{requiredSign}</label>
            }
            {error &&
                <div className="invalid-feedback">
                    {error}
                </div>
            }
        </div>;
    },
    "number": ({ name, readonly, value, label, error, placeholder, dataset, validation,
        onChange }) => {
        let requiredSign = validation.required ? <span className="text-danger">*</span> : <></>;
        return <div className="form-floating">
            <input type="text" className={"form-control rounded-0 " + (error ? "is-invalid" : "")} name={name}
                value={value} readOnly={readonly} placeholder={placeholder} {...dataset}
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
    },
    "checkbox": ({ name, readonly, value, label, error, placeholder, dataset,
        onChange }) => {
        return <div className="form-check form-switch">
            <label className="form-check-label" >
                <input className="form-check-input" type="checkbox" name={name} checked={value} onChange={onChange} {...dataset} />
                {label}
            </label>
        </div>;
    },
    "select": ({ name, readonly, value, label, error, placeholder, dataset, options, groupedOptions, validation,
        onChange }) => {
        if (readonly) {
            let selectText = options.find(k => k.value == value)?.label;
            return <div className="form-floating">
                <input type="text" className={"form-control rounded-0 "}
                    value={selectText} readOnly={true} placeholder={placeholder} {...dataset}
                    onChange={onChange} />
                <input type="hidden" name={name} value={value} />
                {label &&
                    <label>{label}</label>
                }
            </div>;
        } else {
            let requiredSign = validation.required ? <span className="text-danger">*</span> : <></>;
            return <div className="form-floating">
                <select className={"form-control rounded-0 " + (error ? "is-invalid" : "")} name={name} value={value} {...dataset}
                    onChange={onChange}>
                    {options.map(k => <option value={k.value} key={k.value ?? k.label}>{k.label}</option>)}
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
    "reactselect": ({ name, readonly, value, label, error, placeholder, dataset, options, groupedOptions, validation,
        onChange }) => {
        if (readonly) {
            let selectText = options.find(k => k.value == value)?.label;
            return <div className="form-floating">
                <input type="text" className={"form-control rounded-0 "}
                    value={selectText} readOnly={true} placeholder={placeholder} {...dataset}
                    onChange={onChange} />
                <input type="hidden" name={name} value={value} />
                {label &&
                    <label>{label}</label>
                }
            </div>;
        } else {
            let requiredSign = validation.required ? <span className="text-danger">*</span> : <></>;
            let selectText = options.find(k => k.value == value)?.label;
            return <div className="form-floating">
                <ReactSelect
                    styles={{
                        container: (provided) => {
                            return {
                                ...provided,
                            };
                        },
                        ...ReactSelectBootstrapStyle
                    }}
                    value={{
                        value: value,
                        label: selectText
                    }}
                    className={error ? "is-invalid" : ""}
                    onChange={onChange}
                    options={options}
                    placeholder={placeholder}
                />
                {label &&
                    <label style={{
                        opacity: ".65",
                        transform: "scale(.85) translateY(-.5rem) translateX(.15rem)"
                    }}>{label}&nbsp;{requiredSign}</label>
                }
                {error &&
                    <div className="invalid-feedback">
                        {error}
                    </div>
                }
            </div>;
        }
    },
    "reactselectasync": ({ name, readonly, value, selectedLabel, label, error, placeholder, dataset, loadOptions, validation,
        onChange }) => {
        if (readonly) {
            let selectText = selectedLabel;
            return <div className="form-floating">
                <input type="text" className={"form-control rounded-0 "}
                    value={selectText} readOnly={true} placeholder={placeholder} {...dataset}
                    onChange={onChange} />
                <input type="hidden" name={name} value={value} />
                {label &&
                    <label>{label}</label>
                }
            </div>;
        } else {
            let requiredSign = validation.required ? <span className="text-danger">*</span> : <></>;
            return <div className="form-floating">
                <ReactSelectAsync
                    styles={{
                        container: (provided) => {
                            return {
                                ...provided,
                            };
                        },
                        ...ReactSelectBootstrapStyle
                    }}
                    value={{
                        value: value,
                        label: selectedLabel
                    }}
                    className={error ? "is-invalid" : ""}
                    cacheOptions
                    defaultOptions
                    loadOptions={loadOptions}
                    onChange={onChange}
                    placeholder={placeholder}
                />
                {label &&
                    <label style={{
                        opacity: ".65",
                        transform: "scale(.85) translateY(-.5rem) translateX(.15rem)"
                    }}>{label}&nbsp;{requiredSign}</label>
                }
                {error &&
                    <div className="invalid-feedback">
                        {error}
                    </div>
                }
            </div>;
        }
    },
    "reactdatepicker": ({ name, readonly, value, originalValue, label, error, placeholder, dataset, validation,
        clearable,
        onChange }) => {
        let requiredSign = validation.required ? <span className="text-danger">*</span> : <></>;

        if (readonly) {
            return <div className="form-floating">
                <input type="text" className={"form-control rounded-0 "}
                    value={dayjs(value).format("YYYY/MM/DD")} readOnly={true} placeholder={placeholder} {...dataset}
                    onChange={onChange} />
                <input type="hidden" name={name} value={originalValue} />
                {label &&
                    <label>{label}</label>
                }
            </div>;
        }
        return <div className="form-floating ">
            <DatePicker className={"form-control rounded-0 " + (error ? "is-invalid" : "")} selected={value}
                dateFormat="yyyy/MM/dd"
                placeholderText={placeholder}
                customInput={<ReactDatepickerCustomInput
                    isClearable={clearable}
                    label={label} validation={validation} />}
                onChange={onChange} />
            {error &&
                <div className="invalid-feedback">
                    {error}
                </div>
            }
            <input type="hidden" name={name} value={value ? dayjs(value).toISOString() : ""} />
        </div>;
    },
    "button": ({ onClick, text, type }) => {
        return <button className={"btn rounded-0 btn-" + type} onClick={onClick}>{text}</button>;
    },
    "cell": ({ children }) => {
        return children;
    },
    "row": ({ children }) => {
        return <div className="row mb-2">
            {children}
        </div>;
    },
    "fullcolumn": ({ children }) => {
        return <div className="row mb-2">
            <div className="col">
                {children}
            </div>
        </div>;
    },
    "column": ({ children }) => {
        return <div className="col-sm-6">
            {children}
        </div>;
    }
};