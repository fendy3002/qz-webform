import * as React from 'react';
import * as ReactDOM from 'react-dom';

import constructor from './Components/WebForm';
import staticConstructor from './Components/StaticWebForm';
import elementToJson from './helper/elementToJson';
import arrangeElements from './helper/arrangeElements';
import prepareValue from './helper/prepareValue';
import enlang from './lang/en';
const webform = (template, option?: any) => {
    let useOption = {
        autoGrid: true,
        autoPlaceholder: true,
        autoLabel: true,
        autoValidation: true,
        readOnly: false,
        lang: enlang,
        ...(option ?? {}),
    };
    let preprocess = (element, value) => {
        return elementToJson(element, useOption).then((elementsJson) => {
            let elementToRender = elementsJson.elemJSON;
            if (useOption.autoGrid) {
                elementToRender = arrangeElements(elementToRender);
            }
            return {
                elements: elementToRender,
                elemMap: elementsJson.elemMap,
                value: prepareValue(elementToRender, value, useOption)
            };
        });
    }
    const render = (element, value) => {
        return preprocess(element, value).then((result) => {
            let { elements, value } = result;
            let WebForm = constructor(template);
            ReactDOM.render(
                <WebForm elements={elements} data={value} />,
                element
            );
        });
    };
    const renderStatic = (element, value) => {
        return preprocess(element, value).then((result) => {
            let { elements, value } = result;
            let WebForm = staticConstructor(template, useOption.lang);
            ReactDOM.render(
                <WebForm elements={elements} data={value} />,
                element
            );
        });
    };
    return {
        WebForm: constructor(template),

        preprocess,
        render,
        renderStatic
    };
};

export default webform;