let elemMapToContext = (elemMap, option) => {
    let context: {
        [elemName: string]: {
            [tagName: string]: any
        }
    } = {}
    for (let elemName of Object.keys(elemMap)) {
        for (let element of elemMap[elemName]) {
            if (element.tagName == "select") {
                context[elemName] = context[elemName] ?? {};
                context[elemName][element.tagName] = {
                    
                };
            } else if (element.tagName == "reactselect") {
                context[elemName] = context[elemName] ?? {};
                context[elemName][element.tagName] = {
                    
                };
            }
        }
    }
    return context;
};

export default elemMapToContext;