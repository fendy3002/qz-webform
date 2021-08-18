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

let fromTemplate = (template, option?: any) => {
    let useOption = {
        autoGrid: true,
        autoPlaceholder: true,
        autoLabel: true,
        autoValidation: true,
        readOnly: false,
        lang: enlang,
        ...(option ?? {}),
    };
    const elementStructure = (element) => {
        return {
            render: (value) => {
                return xmlStructure(element.innerHTML).render(element, value);
            },
        };
    };

    const xmlStructure = (xml) => {
        return {
            webForm: (language) => {
                return prepareStructure(xml, option).then(({ structure, context }) => {
                    let WebForm = reactWebForm({
                        template: template,
                        structure: structure,
                        context: context,
                        language: language
                    });
                    return WebForm;
                });
            },
            render: (element, value) => {
                return prepareStructure(xml, useOption).then(({ structure, elemMap, context }) => {
                    let preparedValue = prepareValue(structure, value, useOption);
                    let WebFormInstance = staticConstructor({
                        template,
                        structure: structure,
                        language: useOption.lang,
                        data: preparedValue,
                        context: context
                    });
                    ReactDOM.render(
                        <WebFormInstance />,
                        element
                    );
                    return {
                        structure: structure,
                        elemMap: elemMap,
                        context: context
                    };
                });
            }
        };
    };

    return {
        xmlStructure,
        elementStructure,
    }
};

const language = {
    en: enlang
};

export {
    language,
    fromTemplate,
};