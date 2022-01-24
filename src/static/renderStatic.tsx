import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as MobxReact from 'mobx-react';
import staticDummyState from './DummyState';

import * as types from '../types';
import { xml2Element } from './xml2Element';
import { elementBuilder } from '../builder/elementBuilder';
import { StaticWebForm } from '../Components/StaticWebForm';
import { ErrorBoundary } from '../Components/ErrorBoundary';
import { dataValidator } from '../validator/dataValidator';

/**
 * @module Static/renderStatic
 */

/**
 * A rendering engine instance, it is used internally
 * @param param {Object} configuration related to webform rendering
 * @returns the render handler
 */
const renderEngine = ({
    parts,
    language,
    languageCode,
    customParser,
    context,
    xmlString,
    readonly
}) => {
    /**
     * Render the webform and return utilities
     * @param targetElement html dom element to be rendered
     * @param initialData {Object} optional, initial data for webform content
     * @returns {Object} utilities for further operation
     */
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
/**
 * A class to hold information about static rendering options
 */
class StaticRenderBuilder {
    constructor() {
        [
            "withParts",
            "withLanguage",
            "withLanguageCode",
            "fromXml",
            "fromDOM",
        ].forEach(handler => {
            this[handler] = this[handler].bind(this);
        });
    }
    readonly: boolean | ((data: any) => boolean) = null;
    parts: types.Part.CustomPartSet = null;
    language: types.LanguageCodePack = null;
    languageCode: string = "en";
    customParser: types.Static.CustomParserSet = null;
    context: types.Static.Context = {};

    withParts(parts: types.Part.CustomPartSet) {
        this.parts = parts;
        return this;
    }
    withLanguage(language: types.LanguageCodePack) {
        this.language = language;
        return this;
    }
    withLanguageCode(languageCode: string) {
        this.languageCode = languageCode;
        return this;
    }
    withCustomParser(customParser: types.Static.CustomParserSet) {
        this.customParser = customParser;
        return this;
    }
    withContext(context: types.Static.Context) {
        this.context = {
            ...this.context,
            ...context
        };
        return this;
    }
    addContext(id: string, context: any) {
        this.context = {
            ...this.context,
            [id]: context
        };
        return this;
    }
    withSetting(props: {
        readonly?: boolean | ((data: any) => boolean)
    }) {
        this.readonly = props.readonly ?? this.readonly;
        return this;
    }
    /**
     * Render a static webform from xml string
     * @category Static
     * @param xml {String} xml string
     * @returns a renderEngine object
     */
    fromXml(xml: string) {
        return renderEngine({
            context: this.context,
            customParser: this.customParser,
            parts: this.parts,
            language: this.language,
            languageCode: this.languageCode,
            readonly: this.readonly,
            xmlString: xml
        });
    }
    /**
     * Render a static webform from html dom element
     * @category Static
     * @param dom {Object} html dom element contains the elements to render
     * @returns a renderEngine object
     */
    fromDOM(dom) {
        let xml = dom.innerHTML;
        return renderEngine({
            context: this.context,
            customParser: this.customParser,
            parts: this.parts,
            language: this.language,
            languageCode: this.languageCode,
            readonly: this.readonly,
            xmlString: xml
        });
    }
};
/**
 * A shorthand for create a new StaticRenderBuilder instance
 * @category Static
 * @returns a new StaticRenderBuilder instance
 */
export const renderStatic = () => {
    return new StaticRenderBuilder();
}