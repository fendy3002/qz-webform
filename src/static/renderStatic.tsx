import * as types from '../types';

const renderEngine = ({
    parts,
    language,
    languageCode,
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
    fromXml(xmlCode: string) {

    }
    fromElement(element) {
        let xml = element.innerHTML;
    }
};
export const renderStatic = () => {
    return new StaticRenderBuilder();
}