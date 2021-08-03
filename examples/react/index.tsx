import * as React from 'react';

import WebFormConstruct from '../../src/index';
let WebForm = WebFormConstruct({
    "text": ({name, value}) => {
        return <input type="text" name={name} />
    },
    "textarea": ({name, value}) => {
        return <textarea value={value}></textarea>
    },
    "number": ({name, value}) => {
        return <input type="text" name={name} />
    },
    "checkbox": () => {
        return  <></>;
    },
    "select": ({}) => {
        return  <></>;
    },
    "column": ({}) => {
        return  <></>;
    }
});

let render = (element, value) => {
    return WebForm.render(element, value);
};
export {
    render
};