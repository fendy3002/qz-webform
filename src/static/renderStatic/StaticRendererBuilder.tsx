import * as types from '../../types';
import { staticRenderer } from './staticRenderer';

/**
 * A class to hold information about static rendering options
 * @class
 * @memberof static
 */
export class StaticRendererBuilder {
    /**
     * @constructor 
     */
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
    language: types.Language.LanguageCodePack = null;
    languageCode: string = "en";
    customParser: types.Static.CustomParserSet = null;
    context: types.Context = {};

    /**
     * Set the custom parts
     * @function
     * @param parts {Object} 
     * @returns {Object} a {@link static.renderStatic.StaticRenderBuilder StaticRenderBuilder} instance
     */
    withParts(parts: types.Part.CustomPartSet) {
        this.parts = parts;
        return this;
    }

    /**
     * Set the language pack
     * @function
     * @param language {Object} 
     * @returns {Object} a {@link static.renderStatic.StaticRenderBuilder StaticRenderBuilder} instance
     */
    withLanguage(language: types.Language.LanguageCodePack) {
        this.language = language;
        return this;
    }
    /**
     * Set the language code
     * @function
     * @param languageCode {String} language code to refer to specific language code in language pack. Default "en"
     * @returns {Object} a {@link static.renderStatic.StaticRenderBuilder StaticRenderBuilder} instance
     */
    withLanguageCode(languageCode: string) {
        this.languageCode = languageCode;
        return this;
    }
    /**
     * Set custom parser
     * @function
     * @param customParser {Object}
     * @returns {Object} a {@link static.renderStatic.StaticRenderBuilder StaticRenderBuilder} instance
     */
    withCustomParser(customParser: types.Static.CustomParserSet) {
        this.customParser = customParser;
        return this;
    }
    /**
     * Set context
     * @function
     * @param context {Object}
     * @returns {Object} a {@link static.renderStatic.StaticRenderBuilder StaticRenderBuilder} instance
     */
    withContext(context: types.Context) {
        this.context = {
            ...this.context,
            ...context
        };
        return this;
    }
    /**
     * Add a context to specific id
     * @param id {String} element id this context refer to 
     * @param context {Object} the context for element
     * @returns {Object} a {@link static.renderStatic.StaticRenderBuilder StaticRenderBuilder} instance
     */
    addContext(id: string, context: any) {
        this.context = {
            ...this.context,
            [id]: context
        };
        return this;
    }
    /**
     * Set the rendering setting
     * @param props {Object} setting object
     * @returns {Object} a {@link static.renderStatic.StaticRenderBuilder StaticRenderBuilder} instance
     */
    withSetting(props: {
        readonly?: boolean | ((data: any) => boolean)
    }) {
        this.readonly = props.readonly ?? this.readonly;
        return this;
    }
    /**
     * Render a static webform from xml string
     * @function
     * @param xml {String} xml string
     * @returns a renderEngine object
     */
    fromXml(xml: string) {
        return staticRenderer({
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
     * @param dom {Object} html dom element contains the elements to render
     * @returns a renderEngine object
     */
    fromDOM(dom) {
        let xml = dom.innerHTML;
        return staticRenderer({
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