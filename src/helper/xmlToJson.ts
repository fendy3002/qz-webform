import { Parser } from 'xml2js';

let xmlParser = new Parser({
    explicitArray: true,
    explicitChildren: true,
    preserveChildrenOrder: true
});
const xmlToJson = (xml, option) => {
    let lowercasePropName = (prop) => {
        let result: any = {};
        for (let key of Object.keys(prop)) {
            result[key.toLowerCase()] = prop[key];
        }
        return result;
    }
    let propToBoolean = (prop) => {
        let result: any = {
            ...prop,
        };
        if (result.hasOwnProperty("readonly") || option.readOnly) {
            if (!result.hasOwnProperty("editable")) {
                result.readonly = true;
            }
        } if (result.hasOwnProperty("checked")) {
            result.checked = true;
        } if (result.hasOwnProperty("clearable")) {
            result.clearable = true;
        } if (option.autoLabel && !result.label) {
            result.label = result.name ?? "";
        } if (option.autoPlaceholder && !result.placeholder) {
            result.placeholder = result.label ?? result.name;
        } if (result.hasOwnProperty("uppercase")) {
            result.dataset = result.dataset || {};
            result.dataset["data-uppercase"] = true;
            delete result.uppercase;
        } if (result.hasOwnProperty("lowercase")) {
            result.dataset = result.dataset || {};
            result.dataset["data-lowercase"] = true;
            delete result.lowercase;
        }

        return result;
    };
    const prepareFormObject = () => {
        let elemIndex = 0;
        let formObject = (each, elemMap) => {
            let tagName = each['#name'].toLowerCase();
            let result: any = {
                tagName: tagName,
                props: {
                    dataset: {
                        "data-tagname": tagName
                    }
                }
            };
            if (each["$"]) {
                let booleanProps = propToBoolean(lowercasePropName(each["$"]));
                result.props = {
                    ...result.props,
                    ...booleanProps,
                    dataset: {
                        ...result.props.dataset,
                        ...booleanProps.dataset
                    }
                };
                if (result.props.id) {
                    result.id = result.props.id;
                }
                if (result.props.name) {
                    if (!result.id) {
                        result.id = result.tagName + "_" + elemIndex.toString();
                        result.props.id = result.id;
                        elemIndex++;
                    }
                    result.props.dataset['data-id'] = result.id;
                }

                if (result.id) {
                    elemMap[result.id] = elemMap[result.id] ?? [];
                    elemMap[result.id].push(result);
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
            return result;
        };
        return formObject;
    };

    let xmlString = `<root>${xml.trim()}</root>`;
    return xmlParser.parseStringPromise(xmlString).then(xml => {
        let formStructure = xml?.root.$$;

        let result = [];
        let elemMap: {
            [key: string]: []
        } = {};
        let formObject = prepareFormObject();
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