import { Parser } from 'xml2js';

let xmlParser = new Parser({
    explicitArray: true,
    explicitChildren: true,
    preserveChildrenOrder: true
});
const formObject = (each) => {
    let tagName = each['#name'];
    let result: any = {
        tagName: tagName,
    };
    if (each["$"]) {
        result.props = each["$"];
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