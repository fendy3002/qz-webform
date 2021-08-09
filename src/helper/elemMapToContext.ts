import prepareValidationContext from './prepareValidationContext';

let elemMapToContext = (elemMap, option) => {
    let context: {
        [elemName: string]: {
            [tagName: string]: any
        }
    } = {}
    for (let elemName of Object.keys(elemMap)) {
        for (let element of elemMap[elemName]) {
            context[elemName] = context[elemName] ?? {};
            context[elemName][element.tagName] = {
                name: elemName,
                tagName: element.tagName
            };
            if (option.autoValidation) {
                let validation = prepareValidationContext(element, option);
                if (Object.keys(validation).length > 0) {
                    context[elemName][element.tagName].validation = validation;
                }
            }
            if (element.tagName == "select") {
                context[elemName][element.tagName] = {

                };
            } else if (element.tagName == "reactselect") {
                context[elemName][element.tagName] = {

                };
            }
        }
    }
    return context;
};

export default elemMapToContext;