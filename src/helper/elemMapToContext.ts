import prepareValidationContext from './prepareValidationContext';
import * as dayjs from 'dayjs';

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
            if (element.tagName == "reactdatepicker") {
                let converter = {
                    fromSource: (sourceValue: Date | string | number) => {
                        return sourceValue;
                    },
                    toSource: (sourceValue: Date): any => {
                        return sourceValue;
                    }
                };
                if (element.props.sourcetype == "iso") {
                    converter = {
                        fromSource: (sourceValue: Date | string | number) => {
                            return sourceValue ? dayjs(sourceValue).toDate() : null;
                        },
                        toSource: (sourceValue: Date): any => {
                            return sourceValue ? dayjs(sourceValue).toISOString() : "";
                        },
                    };
                } else if (element.props.sourcetype == "timestamp") {
                    converter = {
                        fromSource: (sourceValue: Date | string | number) => {
                            if (!sourceValue) { return null; }
                            if (typeof sourceValue == "string") {
                                sourceValue = parseInt(sourceValue);
                            }
                            return dayjs(sourceValue).toDate();
                        },  
                        toSource: (sourceValue: Date): any => {
                            return sourceValue ? dayjs(sourceValue).valueOf() : "";
                        },
                    };
                }

                context[element.id].converter = converter;
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