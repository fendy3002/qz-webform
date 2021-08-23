import enLang from '../lang/en';
const isNumeric = (value) => {
    return !isNaN(value - parseFloat(value));
};
const construct = (context: any, lang?: any) => {
    let useLang = lang ?? enLang;
    const validate = (evt) => {
        const { currentTarget } = evt;
        let { name, value } = currentTarget;
        const tagName = currentTarget.dataset.tagname;
        const id = currentTarget.dataset.id;
        const validation = context[id]?.validation ?? {};
        let error = {
            [name]: ''
        };
        if (tagName == "text" || tagName == "textarea") {
            let validateMaxlength = validation.maxlength * 1;
            let validateMinlength = validation.minlength * 1;
            if (validation.required && !value) {
                error[name] = useLang.required;
            } else if (validateMaxlength > 0
                && value?.length > validateMaxlength) {
                error[name] = useLang.maxlength_over.replace("{length}", validateMaxlength);
            } else if (validateMinlength > 0
                && value?.length < validateMinlength) {
                error[name] = useLang.minlength_lower.replace("{length}", validateMinlength);
            }
        }
        else if (tagName == "number") {
            const validateMax = validation.max * 1;
            const validateMin = validation.min * 1;
            if (!isNumeric(value)) {
                error[name] = useLang.not_number;
            } else if (validateMax > 0
                && value > validateMax) {
                error[name] = useLang.max_over.replace("{value}", validateMax);
            } else if (validateMin > 0
                && value < validateMin) {
                error[name] = useLang.min_lower.replace("{value}", validateMin);
            }
        }
        else if (tagName == "select" || tagName == "reactselect") {
            if (validation.required && !value) {
                error[name] = useLang.required;
            }
        }
        else if (tagName == "reactselectasync") {
            if (validation.required && !value?.value) {
                error[name] = useLang.required;
            }
        }
        else if (tagName == "checkbox") {
            value = currentTarget.checked;
        }
        if (tagName == "reactdatepicker") {
            if (validation.required && !value) {
                error[name] = useLang.required;
            }
        }
        return {
            value: value,
            error: error
        };
    };
    return {
        validate
    };
}
export default construct