import enLang from '../lang/en';
const isNumeric = (value) => {
    return !isNaN(value - parseFloat(value));
};
const construct = (lang?: any) => {
    let useLang = lang ?? enLang;
    const validate = (evt) => {
        const { currentTarget } = evt;
        const { name, value } = currentTarget;
        const tagName = currentTarget.dataset.tagname;
        let error = {
            [name]: ''
        };
        if (tagName == "text") {
            if (currentTarget.dataset["validateRequired"] && !value) {
                error[name] = useLang.required;
            }
            if (currentTarget.dataset["validateMaxlength"] > 0 
                && value?.length > currentTarget.dataset["validateMaxlength"]) {
                error[name] = useLang.maxlength_over.replace("{length}", currentTarget.dataset["validateMaxlength"]);
            }
            if (currentTarget.dataset["validateMinlength"] > 0 
                && value?.length < currentTarget.dataset["validateMinlength"]) {
                error[name] = useLang.minlength_lower.replace("{length}", currentTarget.dataset["validateMinlength"]);
            }
        }
        else if (tagName == "number") {
            if (!isNumeric(value)) {
                error[name] = useLang.not_number;
            } else {
                error[name] = null;
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