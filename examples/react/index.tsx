import * as React from 'react';

import WebFormConstruct from '../../src/index';

let render = (element, value, option?: any) => {
    let WebForm = WebFormConstruct({
        "text": ({ name, readonly, value, label, placeholder, columnWidth, onChange }) => {
            return <div className="form-floating">
                <input type="text" className="form-control" name={name}
                    onChange={onChange}
                    value={value} readOnly={readonly} placeholder={placeholder} />
                {label &&
                    <label>{label}</label>
                }
            </div>;
        },
        "textarea": ({ name, readonly, value, placeholder }) => {
            return <textarea name={name} className="form-control"
                value={value} readOnly={readonly}
                placeholder={placeholder}></textarea>
        },
        "number": ({ name, readonly, value, placeholder }) => {
            return <input type="text" className="form-control"
                name={name} readOnly={readonly}
                placeholder={placeholder} />
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