import { Parser } from 'xml2js';
import * as types from '../types';
let xmlParser = new Parser({
    explicitArray: true,
    explicitChildren: true,
    preserveChildrenOrder: true
});

let lowercasePropName = (prop) => {
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
export const xml2Element = (props: xml2ElementProps) => {
    return xmlParser.parseStringPromise(props.xmlString).then(xml => {
        let formStructure = xml?.root.$$;

        let result: types.Element[] = [];
        for (let each of formStructure) {
            let lowerCasedStructure = lowercasePropName(each);
            let element: types.Element = {
                tagName: each['#name'].toLowerCase(),
                id: lowerCasedStructure["id"],
                name: lowerCasedStructure["name"],
                props: {},
                context: props.context[lowerCasedStructure["id"]]
            };
            element = props.customParser[element.tagName]?.({
                Element: element,
                xml: lowerCasedStructure,
            }, {
                lowercasePropName: lowercasePropName,
            }) ?? element;
            result.push(element);
        }

        return result;
    });
};