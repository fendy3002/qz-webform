import { Parser } from 'xml2js';
import prepareValidation from './prepareValidation';

let xmlParser = new Parser({
    explicitArray: true,
    explicitChildren: true,
    preserveChildrenOrder: true
});
const xmlToJson = (xml, option) => {

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
    const formObject = (each, elemMap) => {
        let tagName = each['#name'];
        let result: any = {
            tagName: tagName,
            props: {
                dataset: {
                    "data-tagname": tagName
                }
            }
        };
        if (each["$"]) {
            result.props = {
                ...result.props,
                ...propToBoolean(each["$"])
            };
            if (result.props.name) {
                elemMap[result.props.name] = elemMap[result.props.name] ?? [];
                elemMap[result.props.name].push(result);
            }
        }
        if (each["$$"]) {
            // select options
            if (tagName == "select" || tagName == "reactselect") {
                if (each["$$"].some(k => k['#name'] == "optgroup")) {
                    result.groupedOptions = [];
                    let currentGroup = null;
                    for (let eachopts of each["$$"]) {
                        if (eachopts['#name'] == "optgroup") {
                            currentGroup = {
                                label: eachopts.$?.label,
                                options: []
                            };
                            result.groupedOptions.push(currentGroup);
                        } else {
                            currentGroup.options.push({
                                label: eachopts._,
                                value: eachopts["$"]?.value ?? ""
                            });
                        }
                    }
                } else {
                    result.options = each["$$"].map(k => {
                        return {
                            label: k._,
                            value: k["$"]?.value ?? ""
                        };
                    });
                }
            } else {
                result.children = each["$$"].map(k => formObject(k, elemMap));
            }
        }
        if (option.autoValidation) {
            prepareValidation(result, option);
        }
        return result;
    };

    let xmlString = `<root>${xml.trim()}</root>`;
    return xmlParser.parseStringPromise(xmlString).then(xml => {
        let formStructure = xml?.root.$$;

        let result = [];
        let elemMap: {
            [key: string]: []
        } = {};
        for (let each of formStructure) {
            result.push(formObject(each, elemMap));
        }
        return {
            elemJSON: result,
            elemMap: elemMap
        };
    });
};

export default xmlToJson;