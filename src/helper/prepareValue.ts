const prepareValue = (element, value, option) => {
    let result: any = value;
    for (let each of element) {
        if (each.props?.name) {
            result[each.props.name] = value[each.props.name] ?? "";
            if (each.props.labelfield) {
                result[each.props.labelfield] = value[each.props.labelfield] ?? "";
            }
        }
        if (each.children) {
            result = {
                ...result,
                ...prepareValue(each.children, value, option)
            };
        }
    }
    return result;
};

export default prepareValue;