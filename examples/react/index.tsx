import * as React from 'react';

import WebFormConstruct from '../../src/index';

let render = (element, value, option?: any) => {
    let WebForm = WebFormConstruct({
        "text": ({ name, readonly, value, label, error, placeholder, dataset,
            onChange }) => {
            return <div className="form-floating">
                <input type="text" className={"form-control rounded-0 " + (error ? "is-invalid" : "")} name={name}
                    onChange={onChange} {...dataset}
                    value={value} readOnly={readonly} placeholder={placeholder} />
                {label &&
                    <label>{label}</label>
                }
                {error &&
                    <div className="invalid-feedback">
                        {error}
                    </div>
                }
            </div>;
        },
        "textarea": ({ name, readonly, value, placeholder, onChange }) => {
            return <textarea name={name} className="form-control"
                value={value} readOnly={readonly}
                placeholder={placeholder} onChange={onChange}></textarea>;
        },
        "number": ({ name, readonly, value, placeholder, onChange }) => {
            return <input type="text" className="form-control"
                name={name} readOnly={readonly} value={value}
                placeholder={placeholder} onChange={onChange} />;
        },
        "checkbox": ({ name, readOnly, value }) => {
            return <></>;
        },
        "select": ({ name, readOnly, value }) => {
            return <></>;
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
    });

    return WebForm.renderStatic(element, value);
};
export {
    render
};