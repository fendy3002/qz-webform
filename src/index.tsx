import * as React from 'react';
import * as ReactDOM from 'react-dom';

import constructor from './Components/WebForm';
import staticConstructor from './Components/StaticWebForm';
import reactWebForm from './Components/ReactWebForm';
import xmlToJson from './helper/xmlToJson';
import arrangeElements from './helper/arrangeElements';
import prepareValue from './helper/prepareValue';
import elemMapToContext from './helper/elemMapToContext';
import enlang from './lang/en';

const prepareStructure = (xml: string, option?: any) => {
    let useOption = {
        autoGrid: true,
        autoPlaceholder: true,
        autoLabel: true,
        autoValidation: true,
        readOnly: false,
        lang: enlang,
        additionalContext: {},
        ...(option ?? {}),
    };
    return xmlToJson(xml, useOption).then((elementsJson) => {
        let elementToRender = elementsJson.elemJSON;
        if (useOption.autoGrid) {
            elementToRender = arrangeElements(elementToRender);
        }
        return {
            structure: elementToRender,
            elemMap: elementsJson.elemMap,
            context: elemMapToContext(elementsJson.elemMap, useOption)
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
        return prepareStructure(element.innerHTML, useOption).then(({ structure, elemMap, context }) => {
            return {
                structure: structure,
                elemMap: elemMap,
                value: prepareValue(structure, value, useOption),
                context: context
            };
        });
    }
    // const render = (element, value) => {
    //     return preprocessWithValue(element, value).then((result) => {
    //         let { structure, value } = result;
    //         let WebForm = constructor(template);
    //         ReactDOM.render(
    //             <WebForm structure={structure} data={value} />,
    //             element
    //         );
    //     });
    // };
    const renderStatic = (element, value) => {
        return preprocessWithValue(element, value).then((result) => {
            let { structure, value, context } = result;
            let WebForm = staticConstructor({
                template,
                structure: structure,
                language: useOption.lang,
                data: value,
                context: context
            });
            ReactDOM.render(
                <WebForm />,
                element
            );
        });
    };
    return {
        WebForm: constructor(template),

        preprocessWithValue,
        // render,
        renderStatic
    };
};
const language = {
    en: enlang
};
const react = {
    prepareStructure,
    webForm: reactWebForm
};
export {
    webform,
    language,
    react
};