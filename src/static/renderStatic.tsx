import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as MobxReact from 'mobx-react';
import staticDummyState from './DummyState';

import * as types from '../types';
import { xml2Element } from './xml2Element';
import { elementBuilder } from '../builder/elementBuilder';
import { StaticWebForm } from '../Components/StaticWebForm';
const renderEngine = ({
    parts,
    language,
    languageCode,
    customParser,
    context,
    xmlString
}) => {
    const render = (targetElement: any, initialData?: any) => {
        return xml2Element({
            context: context,
            customParser: customParser,
            xmlString: xmlString
        }).then(elements => {
            let buildResult = elementBuilder(elements).build(initialData);
            let DummyState = new staticDummyState(buildResult.data);
            ReactDOM.render(
                <MobxReact.Provider store={DummyState}>
                    <StaticWebForm
                        Elements={buildResult.Elements}
                        Parts={parts}
                        Language={language}
                        LanguageCode={languageCode}
                    ></StaticWebForm>
                </MobxReact.Provider>,
                targetElement
            );
        });
    };
    return {
        render
    };
};
class StaticRenderBuilder {
    constructor() {
        [
            "withParts",
            "withLanguage",
            "withLanguageCode",
            "fromXml",
            "fromElement",
        ].forEach(handler => {
            this[handler] = this[handler].bind(this);
        });
    }
    readonly: boolean = null;
    parts: types.Part.CustomPartSet = null;
    language: types.LanguageCodePack = null;
    languageCode: string = "en";
    customParser: types.Static.CustomParser = null;
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
    withCustomParser(customParser: types.Static.CustomParser) {
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
        readonly?: boolean
    }) {
        this.readonly = props.readonly ?? this.readonly;
        return this;
    }
    fromXml(xml: string) {
        return renderEngine({
            context: this.context,
            customParser: this.customParser,
            parts: this.parts,
            language: this.language,
            languageCode: this.languageCode,
            xmlString: xml
        });
    }
    fromElement(element) {
        let xml = element.innerHTML;
        return renderEngine({
            context: this.context,
            customParser: this.customParser,
            parts: this.parts,
            language: this.language,
            languageCode: this.languageCode,
            xmlString: xml
        });
    }
};
export const renderStatic = () => {
    return new StaticRenderBuilder();
}