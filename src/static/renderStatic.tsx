import * as types from '../types';

const renderEngine = ({
    parts,
    language,
    languageCode,
    customParser,
    context
}) => {
    const render = (initialValue) => {
        
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
    fromXml(xmlCode: string) {

    }
    fromElement(element) {
        let xml = element.innerHTML;
    }
};
export const renderStatic = () => {
    return new StaticRenderBuilder();
}