import enLang from '../lang/en';
import valueValidatorConstruct from './valueValidator';
const construct = (context: any, lang?: any) => {
    let useLang = lang ?? enLang;
    let valueValidator = valueValidatorConstruct(useLang);
    let validate = (data) => {
        let result = [];
        for (let elemId of context) {
            let elemContext = context[elemId];
            if (!elemContext.validation) {
                continue;
            }
            let validateElementResult = valueValidator.validate(data[elemContext.name], elemContext);
            if (validateElementResult) {
                result.push(validateElementResult);
            }
        }

        return {
            hasError: result.length > 0,
            array: () => result,
            object: () => {
                let objResult: any = {}
                for (let err of result) {
                    objResult[err.name] = err.error;
                }
                return objResult;
            }
        };
    }
    
    return {
        validate
    };
};
export default construct;