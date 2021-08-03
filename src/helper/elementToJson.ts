import { Parser } from 'xml2js';

let xmlParser = new Parser({
    explicitArray: true,
    explicitChildren: true,
    preserveChildrenOrder: true
});
let propToBoolean = (prop) => {
    let result: any = {
        ...prop,
    };
    if (result.hasOwnProperty("readonly")) {
        result.readonly = true;
    } if (result.hasOwnProperty("checked")) {
        result.checked = true;
    }

    return result;
};
const formObject = (each) => {
    let tagName = each['#name'];
    let result: any = {
        tagName: tagName,
    };
    if (each["$"]) {
        result.props = propToBoolean(each["$"]);
    }
    if (each["$$"]) {
        result.children = each["$$"].map(k => formObject(k));
    }
    return result;
};
const elementToJson = (element) => {
    let xmlString = `<root>${element.innerHTML.trim()}</root>`;
    return xmlParser.parseStringPromise(xmlString).then(xml => {
        let formStructure = xml?.root.$$;
        let result = [];
        for (let each of formStructure) {
            result.push(formObject(each));
        }
        return result;
    });
};

export default elementToJson;