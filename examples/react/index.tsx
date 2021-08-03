import * as React from 'react';

import WebFormConstruct from '../../src/index';
let WebForm = WebFormConstruct({
    "text": ({name, value}) => {
        return <input type="text" />
    },
    "textarea": ({name, value}) => {
        return <textarea value={value}></textarea>
    }
});

let render = (element, value) => {
    return WebForm.render(element, value);
};
export {
    render
};