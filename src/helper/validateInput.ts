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
            if (currentTarget.dataset.required && !value) {
                error[name] = useLang.required;
            }
            if (currentTarget.dataset.maxlength > 0 
                && value?.length > currentTarget.dataset.maxlength) {
                error[name] = useLang.maxlength_over.replace("{length}", currentTarget.dataset.maxlength);
            }
            if (currentTarget.dataset.minlength > 0 
                && value?.length < currentTarget.dataset.minlength) {
                error[name] = useLang.minlength_lower.replace("{length}", currentTarget.dataset.minlength);
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