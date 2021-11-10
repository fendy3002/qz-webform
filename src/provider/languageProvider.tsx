import * as React from 'react';
import { LanguageContext } from '../context/LanguageContext';
import * as lo from 'lodash';
import * as predefinedLang from '../lang';
export default (props) => {
    let { children, languageCode, ...lang } = props;
    lang = lo.merge(lang, predefinedLang);
    let providedLanguageCode = languageCode ?? "en";
    let setLanguageCode = (newCode: string) => {
        providedLanguageCode = newCode;
    };

    return <LanguageContext.Provider value={{
        languageCode: providedLanguageCode,
        setLanguageCode,
        language: lang
    }}>{children}</LanguageContext.Provider>;
};