import * as React from 'react';
import * as ReactDOM from 'react-dom';

import constructor from './Components/WebForm';
import staticConstructor from './Components/StaticWebForm';
import elementToJson from './helper/elementToJson';
import arrangeElements from './helper/arrangeElements';
const webform = (template, option?: any) => {
    let useOption = {
        autoGrid: true,
        autoPlaceholder: true,
        autoLabel: true,
        readOnly: false,
        ...(option ?? {}),
    };
    let processElement = (element, value) => {
        return elementToJson(element, useOption).then((elementsJson) => {
            let elementToRender = elementsJson;
            if (useOption.autoGrid) {
                elementToRender = arrangeElements(elementToRender);
            }
            return elementToRender
        });
    }
    const render = (element, value) => {
        return processElement(element, value).then((elementToRender) => {
            let WebForm = constructor(template);
            ReactDOM.render(
                <WebForm elements={elementToRender} data={value} />,
                element
            );
        });
    };
    const renderStatic = (element, value) => {
        return processElement(element, value).then((elementToRender) => {
            let WebForm = staticConstructor(template);
            ReactDOM.render(
                <WebForm elements={elementToRender} data={value} />,
                element
            );
        });
    };
    return {
        WebForm: constructor(template),

        processElement,
        render,
        renderStatic
    };
};

export default webform;