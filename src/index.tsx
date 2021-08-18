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
    let preprocessXmlWithValue = (xml, value) => {
        return prepareStructure(xml, useOption).then(({ structure, elemMap, context }) => {
            return {
                structure: structure,
                elemMap: elemMap,
                value: prepareValue(structure, value, useOption),
                context: context
            };
        });
    };
    const elementStructure = (element) => {
        return {
            render: (value) => {
                return xmlStructure(element.innerHTML).render(element, value);
            }
        };
    };
    const xmlStructure = (xml) => {
        return {
            render: (element, value) => {
                return preprocessXmlWithValue(xml, value).then((result) => {
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
            }
        };
    };
    
    return {
        WebForm: constructor(template),

        xmlStructure,
        elementStructure,
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