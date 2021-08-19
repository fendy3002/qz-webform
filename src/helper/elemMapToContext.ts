import prepareValidationContext from './prepareValidationContext';

let elemMapToContext = (elemMap, option) => {
    let context: {
        [elemId: string]: any
    } = {}
    for (let elemId of Object.keys(elemMap)) {
        for (let element of elemMap[elemId]) {
            context[element.id] = {
                name: element.props.name,
                tagName: element.tagName
            };
            if (option.autoValidation) {
                let validation = prepareValidationContext(element, option);
                if (Object.keys(validation).length > 0) {
                    context[element.id].validation = validation;
                }
            }
            if (element.tagName == "select") {
                // context[elemName][element.tagName] = {

                // };
            } else if (element.tagName == "reactselect") {
                // context[elemName][element.tagName] = {

                // };
            }
            if (option.additionalContext[element.id]) {
                context[element.id] = {
                    ...context[element.id],
                    ...option.additionalContext[element.id]
                };
            }
        }
    }
    return context;
};

export default elemMapToContext;