import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as MobxReact from 'mobx-react';
import staticDummyState from '../DummyState';

import { xml2Element } from '../xml2Element';
import { elementBuilder } from '../../builder/elementBuilder';
import { StaticWebForm } from '../../Components/StaticWebForm';
import { ErrorBoundary } from '../../Components/ErrorBoundary';
import { dataValidator } from '../../validator/dataValidator';

/**
 * Render the webform and return utilities
 * @typedef {Function} RenderHandler
 * @param targetElement {Object} html dom element to be rendered
 * @param initialData {Object} optional, initial data for webform content
 * @returns {Object} utilities for further operation
 */
/**
 * @typedef {Object} RenderHandlerType
 * @property {RenderHandler} render
 */

/**
 * A rendering engine instance, it is used internally
 * @memberof static
 * @function
 * @param param {Object} configuration related to webform rendering
 * @returns {RenderHandlerType} the render handler
 */
export const staticRenderer = ({
    parts,
    language,
    languageCode,
    customParser,
    context,
    xmlString,
    readonly
}) => {
    // renderHandler typedef
    const render = (targetElement: HTMLElement, initialData?: any) => {
        // parse the xmlString
        return xml2Element({
            context: context,
            customParser: customParser,
            xmlString: xmlString
        }).then(elements => {
            let buildResult = elementBuilder(elements).withAutoGrid().build(initialData);
            let DummyState = new staticDummyState(buildResult.data);
            let StaticWebFormInstance = StaticWebForm({
                Elements: buildResult.Elements,
                Language: language,
                LanguageCode: languageCode,
                Parts: parts,
                readonly: readonly
            });
            ReactDOM.render(
                <ErrorBoundary>
                    <MobxReact.Provider store={DummyState}>
                        <StaticWebFormInstance></StaticWebFormInstance>
                    </MobxReact.Provider>
                </ErrorBoundary>,
                targetElement
            );

            return {
                /**
                 * @returns current data in webform
                 */
                data: () => buildResult.data,
                /**
                 * @returns validation result to current data in webform
                 */
                validateData: () => {
                    let validationResult = dataValidator(parts, language)(buildResult.Elements, buildResult.data)
                    DummyState.error = {
                        ...DummyState.error,
                        ...validationResult.object()
                    };
                    return validationResult;
                }
            };
        });
    };
    return {
        render
    };
};