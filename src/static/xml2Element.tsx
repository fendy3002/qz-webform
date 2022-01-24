import { Parser } from 'xml2js';
import { merge } from 'lodash';
import * as predefinedParser from './predefinedParser';
import * as types from '../types';

/**
 * @module Static/xml2Element
 */

let xmlParser = new Parser({
    explicitArray: true,
    explicitChildren: true,
    preserveChildrenOrder: true
});
/**
 * @category Static
 * @param prop {Object} key-value object
 * @returns {Object} prop with all of it's prop name changed to lowercase
 */
let lowercasePropName = (prop) => {
    if (!prop) { return {}; }
    let result: any = {};
    for (let key of Object.keys(prop)) {
        result[key.toLowerCase()] = prop[key];
    }
    return result;
};
export interface xml2ElementProps {
    xmlString: string,
    context: types.Static.Context,
    customParser: types.Static.CustomParserSet
};
/**
 * 
 * @param props 
 * @returns {Promise}
 */
export const xml2Element = (props: xml2ElementProps) => {
    // add root to xml string
    let xmlString = `<root>${props.xmlString.trim()}</root>`;
    // merge custom parser with predefined parsers
    let customParser = merge({}, props.customParser, predefinedParser);

    /**
     * Recursively parse each xml structure
     * @param each {Object} a result from xml2js or it's child
     * @returns {Object}
     */
    const innerParse = (each) => {
        // all prop fields is lowercased
        let lowerCasedStructure = lowercasePropName(each.$);
        
        let element: types.Element = {
            tagName: each['#name'].toLowerCase(),
            id: lowerCasedStructure["id"],
            name: lowerCasedStructure["name"],
            props: lowerCasedStructure,
            context: props.context[lowerCasedStructure["id"]],
            validation: {}
        };
        // if a customParser exists for an element, use it to parse
        // if not, use the existing element object
        element = customParser[element.tagName]?.({
            Element: element,
            xml: {
                ...each,
                $: {
                    lowerCasedStructure
                }
            },
        }, {
            lowercasePropName: lowercasePropName,
            parseChild: innerParse,
        }) ?? element;
        return element;
    };
    return xmlParser.parseStringPromise(xmlString).then(xml => {
        // the form structure, array of xml elements
        let formStructure = xml?.root.$$;

        let result: types.Element[] = [];
        for (let each of formStructure) {
            result.push(innerParse(each));
        }

        return result;
    });
};