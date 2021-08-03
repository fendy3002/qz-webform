import { Parser } from 'xml2js';

let xmlParser = new Parser({
    explicitArray: true,
    explicitChildren: true,
    preserveChildrenOrder: true
});
const elementToJson = (element, option) => {

    let propToBoolean = (prop) => {
        let result: any = {
            ...prop,
        };
        if (result.hasOwnProperty("readonly") || option.readOnly) {
            result.readonly = true;
        } if (result.hasOwnProperty("checked")) {
            result.checked = true;
        } if (option.autoLabel && !result.label) {
            result.label = result.name ?? "";
        } if (option.autoPlaceholder && !result.placeholder) {
            result.placeholder = result.label ?? result.name;
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