
let modifyProp = (element, propName) => {
    if (element.props?.hasOwnProperty(propName)) {
        element.props.dataset = element.props.dataset || {};
        element.props.dataset["data-validate-" + propName.toLowerCase()] = (propName == "required") ?
            true :
            element.props[propName];
        delete element.props[propName];
    }
}
let prepare = (element, option) => {
    if (element.tagName == "text" ||
        element.tagName == "textarea") {
        for (let propName of [
            "maxlength",
            "minlength",
            "required"
        ]) {
            modifyProp(element, propName);
        }
    } else if (element.tagName == "number") {
        [
            "max",
            "min",
            "required"
        ].map(propName => modifyProp(element, propName));
    }
    return;
};

export default prepare;