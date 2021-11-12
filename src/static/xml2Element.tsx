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

export const xml2Element = (xmlString: string) => {
    return xmlParser.parseStringPromise(xmlString).then(xml => {
        let formStructure = xml?.root.$$;

        let result: types.Element[] = [];
        for (let each of formStructure) {
            let element: types.Element = {
                tagName: each['#name'].toLowerCase(),
                props: {}
            }
        }

        return result;
    });
};