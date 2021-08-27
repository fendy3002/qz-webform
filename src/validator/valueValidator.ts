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
            const validateMax = validation.max * 1;
            const validateMin = validation.min * 1;
            if (!isNumeric(value)) {
                result = {
                    name: name,
                    error: useLang.not_number
                };
            } else if (validateMax > 0
                && value > validateMax) {
                result = {
                    name: name,
                    error: useLang.max_over.replace("{value}", validateMax)
                };
            } else if (validateMin > 0
                && value < validateMin) {
                result = {
                    name: name,
                    error: useLang.min_lower.replace("{value}", validateMin)
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