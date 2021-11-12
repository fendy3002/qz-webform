import { merge } from 'lodash';
import * as predefinedLanguage from '../lang';
import * as predefinedPart from '../part';
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
export const dataValidator = (customParts?: types.Part.CustomPartSet, customLanguage?: types.LanguagePack) => {
    let parts = merge({}, predefinedPart, customParts);
    let language = merge({}, predefinedLanguage, customLanguage);
    let innerValidate = (elements: types.Element[], data: any) => {
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
            if (each.children && each.children.length > 0) {
                validationResult = [
                    ...validationResult,
                    ...innerValidate(each.children, data)
                ];
            }
        }
        return validationResult;
    };
    let validate = (elements: types.Element[], data: any) => {
        let validationResult = innerValidate(elements, data);
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
    return validate;
};