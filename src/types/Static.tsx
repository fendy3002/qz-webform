import * as Base from './Base';

/**
 * 
 */
export interface CustomParserTools {
    /**
     * Parse xml2js object as children
     * @function
     * @param xml {Object} parsed xml2js object
     * @returns {@link Element} webform Element object
     */
    parseChild: (xml: any) => Element,
    /**
     * Lowercase all property name
     * @function
     * @param prop {Object} object that keys want to be lowercased
     * @returns {Object} prop object with lowercased keys
     */
    lowercasePropName: (prop: any) => any
};
/**
 * Parse xml and modify existing Element
 * @function
 * @param props {Object}
 * @param tools {@link CustomParserTools}
 * @returns {@link Element}
 */
export interface CustomParser {
    (props: {
        Element: Base.Element,
        xml: any,
    }, tools: CustomParserTools): Base.Element
}

/**
 * Set of Custom Parser defined by tagName
 */
export interface CustomParserSet {
    /**
     * Collection of Custom Parser object with Element's tagName as key
     */
    [tagName: string]: CustomParser
}
/**
 * 
 */
export interface Xml2ElementProps {
    xmlString: string,
    context: Base.Context,
    customParser: CustomParserSet
};