import * as React from 'react';

import WebFormConstruct from '../../src/index';
let WebForm = WebFormConstruct({
    "text": ({ name, readonly, value }) => {
        return <input type="text" className="form-control" name={name} readOnly={readonly} />
    },
    "textarea": ({ name, readonly, value }) => {
        return <textarea name={name} className="form-control" value={value} readOnly={readonly}></textarea>
    },
    "number": ({ name, readonly, value }) => {
        return <input type="text" className="form-control" name={name} readOnly={readonly} />
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

let render = (element, value) => {
    return WebForm.render(element, value);
};
export {
    render
};