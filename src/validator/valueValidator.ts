import enLang from '../lang/en';

const isNumeric = (value) => {
    return !isNaN(value - parseFloat(value));
};
const construct = (lang) => {
    let useLang = lang ?? enLang;
    const validateValue = (value, elemContext) => {
        let { name, tagName, validation } = elemContext;
        let result = null;
        if (!validation) {
            return result;
        }
        if (tagName == "text" || tagName == "textarea") {
            let validateMaxlength = validation.maxlength * 1;
            let validateMinlength = validation.minlength * 1;
            if (validation.required && !value) {
                result = {
                    name: name,
                    error: useLang.required
                }
            } else if (validateMaxlength > 0
                && value?.length > validateMaxlength) {
                result = {
                    name: name,
                    error: useLang.maxlength_over.replace("{length}", validateMaxlength)
                };
            } else if (validateMinlength > 0
                && value?.length < validateMinlength) {
                result = {
                    name: name,
                    error: useLang.minlength_lower.replace("{length}", validateMinlength)
                };
            }
        }
        else if (tagName == "number") {
            if (!isNumeric(value)) {
                result = {
                    name: name,
                    error: useLang.not_number
                };
            } else if (validation.max != null &&
                validation.max != undefined &&
                validation.max != "" &&
                isNumeric(validation.max) &&
                value > (validation.max * 1)) {
                result = {
                    name: name,
                    error: useLang.max_over.replace("{value}", (validation.max * 1))
                };
            } else if (validation.min != null &&
                validation.min != undefined &&
                validation.min != "" &&
                isNumeric(validation.min) &&
                value < (validation.min * 1)) {
                result = {
                    name: name,
                    error: useLang.min_lower.replace("{value}", (validation.min * 1))
                };
            }
        }
        else if (tagName == "select" || tagName == "reactselect") {
            if (validation.required && !value) {
                result = {
                    name: name,
                    error: useLang.required
                };
            }
        }
        else if (tagName == "reactselectasync") {
            if (validation.required && !value) {
                result = {
                    name: name,
                    error: useLang.required
                };
            }
        }
        else if (tagName == "reactdatepicker") {
            if (validation.required && !value) {
                result = {
                    name: name,
                    error: useLang.required
                };
            }
        }
        return result;
    }
    return {
        validate: validateValue
    }
};
export default construct;