
let modifyProp = (element, propName) => {
    if (element.props?.[propName]) {
        element.props.dataset = element.props.dataset || {};
        element.props.dataset["data-validation-" + propName.toLowerCase()] = element.props[propName];
        delete element.props[propName];
    }
}
let prepare = (element, option) => {
    if (element.tagName == "text") {
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