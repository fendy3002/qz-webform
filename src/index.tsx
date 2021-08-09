import * as React from 'react';
import * as ReactDOM from 'react-dom';

import constructor from './Components/WebForm';
import staticConstructor from './Components/StaticWebForm';
import xmlToJson from './helper/xmlToJson';
import arrangeElements from './helper/arrangeElements';
import prepareValue from './helper/prepareValue';
import enlang from './lang/en';

const prepareStructure = (xml: string, option?: any) => {
    let useOption = {
        autoGrid: true,
        autoPlaceholder: true,
        autoLabel: true,
        autoValidation: true,
        readOnly: false,
        lang: enlang,
        ...(option ?? {}),
    };
    return xmlToJson(xml, useOption).then((elementsJson) => {
        let elementToRender = elementsJson.elemJSON;
        if (useOption.autoGrid) {
            elementToRender = arrangeElements(elementToRender);
        }
        return {
            elements: elementToRender,
            elemMap: elementsJson.elemMap,
        };
    });
};

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
    let preprocessWithValue = (element, value) => {
        return prepareStructure(element.innerHTML, useOption).then(({ elements, elemMap }) => {
            return {
                elements: elements,
                elemMap: elemMap,
                value: prepareValue(elements, value, useOption)
            };
        });
    }
    const render = (element, value) => {
        return preprocessWithValue(element, value).then((result) => {
            let { elements, value } = result;
            let WebForm = constructor(template);
            ReactDOM.render(
                <WebForm elements={elements} data={value} />,
                element
            );
        });
    };
    const renderStatic = (element, value) => {
        return preprocessWithValue(element, value).then((result) => {
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

        preprocessWithValue,
        render,
        renderStatic
    };
};

export {
    webform,
    prepareStructure
};