import enLang from '../lang/en';
import valueValidatorConstruct from './valueValidator';

const construct = (context: any, lang?: any) => {
    let useLang = lang ?? enLang;
    let valueValidator = valueValidatorConstruct(useLang);
    const validate = (evt) => {
        const { currentTarget } = evt;
        const id = currentTarget.dataset.id ?? currentTarget.id;
        let elemContext = context[id];
        let { name, value } = currentTarget;
        if (!elemContext) {
            return {
                value: value,
                error: {}
            };
        }
        let { tagName } = elemContext;

        if (tagName == "checkbox") {
            value = currentTarget.checked;
        }

        let validationResult = valueValidator.validate(value, elemContext);
        let error = {
            [name]: validationResult?.error ?? ""
        };

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