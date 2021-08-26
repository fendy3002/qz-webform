
let modifyProp = (element, propName) => {
    let value: any = null;
    if (element.props?.hasOwnProperty(propName)) {
        value = (propName == "required") ?
            true :
            element.props[propName];
        delete element.props[propName];
        return {
            [propName.toLowerCase()]: value
        };
    }
    return {};
}
let prepare = (element, option) => {
    let result: any = {};
    if (element.tagName == "text" ||
        element.tagName == "textarea") {
        for (let propName of [
            "maxlength",
            "minlength",
            "required"
        ]) {
            result = {
                ...result,
                ...modifyProp(element, propName)
            };
        }
    } else if (element.tagName == "number") {
        [
            "max",
            "min",
            "required"
        ].map(propName => {
            result = {
                ...result,
                ...modifyProp(element, propName)
            };
        });
    } else if (element.tagName == "reactdatepicker") {
        [
            "required"
        ].map(propName => {
            result = {
                ...result,
                ...modifyProp(element, propName)
            };
        });
    } else if (element.tagName == "select" ||
        element.tagName == "reactselect" ||
        element.tagName == "reactselectasync") {
        [
            "required"
        ].map(propName => {
            result = {
                ...result,
                ...modifyProp(element, propName)
            };
        });
    }
    return result;
};

export default prepare;