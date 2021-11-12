import * as types from '../types';
const calculateBoolean = (handler: boolean | ((data: any) => boolean), data) => {
    if (typeof (handler) == "boolean") {
        return handler;
    } else if (!handler) {
        return null;
    } else {
        return handler(data);
    }
};
export const dataValidator = (elements: types.Element[], parts: types.Part.CustomPartSet, language: types.LanguagePack) =>
    (data: any) => {
        let validationResult: {
            name: string,
            error: string
        }[] = [];
        for (let each of elements) {
            let elementProps: types.Component.ElementProps = {
                ...each,
                validation: {
                    hidden: calculateBoolean(each.validation.hidden, data),
                    readonly: calculateBoolean(each.validation.readonly, data),
                    required: calculateBoolean(each.validation.required, data),
                }
            }
            let valueResult = parts[each.tagName].validation({
                Element: elementProps,
                Language: language,
                data: data,
                value: data[each.name]
            });
            if (valueResult) {
                for (let elemName of Object.keys(valueResult)) {
                    if (valueResult[elemName]) {
                        validationResult.push({
                            name: elemName,
                            error: valueResult[elemName]
                        });
                    }
                }
            }
        }
        return {
            hasError: validationResult.length > 0,
            array: () => validationResult,
            object: () => {
                let objResult: any = {}
                for (let err of validationResult) {
                    objResult[err.name] = err.error;
                }
                return objResult;
            }
        };
    };