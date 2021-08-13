import React from 'react';
import ReactSelect from 'react-select';
import ReactSelectAsync from 'react-select/async';
import ReactSelectBootstrapStyle from './ReactSelectBootstrapStyle';

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