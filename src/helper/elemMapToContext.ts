export interface SelectContext {

};

let elemMapToContext = (elemMap, option) => {
    let context: {
        [elemName: string]: {
            [tagName: string]: SelectContext
        }
    } = {}
    for (let elemName of Object.keys(elemMap)) {
        for (let element of elemMap[elemName]) {
            if (element.tagName == "select") {
                context[elemName] = context[elemName] ?? {};
                context[elemName][element.tagName] = {
                    
                };
            }
        }
    }
    return context;
};

export default elemMapToContext;