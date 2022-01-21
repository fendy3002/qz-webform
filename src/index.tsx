// import * as React from 'react';
// import * as ReactDOM from 'react-dom';

// import staticConstructor from './Components/StaticWebForm';
// import reactWebForm from './Components/ReactWebForm';
// import xmlToJson from './helper/xmlToJson';
// import arrangeElements from './helper/arrangeElements';
// import prepareValue from './helper/prepareValue';
// import elemMapToContext from './helper/elemMapToContext';
// import dataValidatorConstruct from './validator/dataValidator';
// import staticDummyState from './helper/staticDummyState';
// import enlang from './lang/en';
// import { toJS } from 'mobx';
// import * as MobxReact from 'mobx-react';

// const prepareStructure = (xml: string, option?: any) => {
//     let useOption = {
//         autoGrid: true,
//         autoPlaceholder: true,
//         autoLabel: true,
//         autoValidation: true,
//         readOnly: false,
//         lang: enlang,
//         additionalContext: {},
//         ...(option ?? {}),
//     };
//     return xmlToJson(xml, useOption).then((elementsJson) => {
//         let elementToRender = elementsJson.elemJSON;
//         if (useOption.autoGrid) {
//             elementToRender = arrangeElements(elementToRender);
//         }
//         return {
//             structure: elementToRender,
//             elemMap: elementsJson.elemMap,
//             context: elemMapToContext(elementsJson.elemMap, useOption)
//         };
//     });
// };

// let fromTemplate = (template, option?: any) => {
//     let useOption = {
//         autoGrid: true,
//         autoPlaceholder: true,
//         autoLabel: true,
//         autoValidation: true,
//         readOnly: false,
//         lang: enlang,
//         staticOnChange: false,
//         ...(option ?? {}),
//     };
//     const elementStructure = (element) => {
//         return {
//             render: (value) => {
//                 return xmlStructure(element.innerHTML).render(element, value);
//             },
//         };
//     };

//     const xmlStructure = (xml) => {
//         return {
//             webForm: (language) => {
//                 return prepareStructure(xml, option).then(({ structure, context }) => {
//                     let dataValidator = dataValidatorConstruct(context, language);
//                     let WebForm = reactWebForm({
//                         template: template,
//                         structure: structure,
//                         context: context,
//                         language: language
//                     });
//                     return {
//                         WebForm,
//                         dataValidator
//                     };
//                 });
//             },
//             render: (element, value) => {
//                 return prepareStructure(xml, useOption).then(({ structure, elemMap, context }) => {
//                     let preparedValue = prepareValue(structure, value, useOption);
//                     let DummyState = new staticDummyState(preparedValue);
//                     let WebFormInstance = staticConstructor({
//                         template,
//                         structure: structure,
//                         language: useOption.lang,
//                         context: context,
//                         staticOnChange: useOption.staticOnChange
//                     });
//                     let dataValidator = dataValidatorConstruct(context, useOption.lang);
//                     ReactDOM.render(
//                         <MobxReact.Provider store={DummyState}>
//                             <WebFormInstance />
//                         </MobxReact.Provider>,
//                         element
//                     );
//                     return {
//                         structure: structure,
//                         elemMap: elemMap,
//                         context: context,
//                         data: () => toJS(DummyState.data),
//                         validateData: () => {
//                             let validationResult = dataValidator.validate(toJS(DummyState.data));
//                             DummyState.error = {
//                                 ...DummyState.error,
//                                 ...validationResult.object()
//                             };
//                             return validationResult;
//                         }
//                     };
//                 });
//             }
//         };
//     };

//     return {
//         xmlStructure,
//         elementStructure,
//     };
// };

// const language = {
//     en: enlang
// };

// export {
//     language,
//     fromTemplate,
// };

export * as types from './types';
export * from './builder/elementBuilder';
export * from './builder/tools';
export * from './Components/ElementComponent';
export * from './Components/WebForm';
export * from './Components/StaticWebForm';
export * from './Components/CaseInput';
export * from './context/LanguageContext';
export * from './context/PartsContext';
export * from './hooks/useLanguage';
export * from './hooks/useLanguageCode';
export * from './hooks/useParts';
export * from './static/xml2Element';
export * from './static/DummyState';
export * from './static/renderStatic';
export * as predefinedParser from './static/predefinedParser/index';
export * from './provider/languageProvider';
export * from './provider/partsProvider';
export * from './validator/dataValidator';