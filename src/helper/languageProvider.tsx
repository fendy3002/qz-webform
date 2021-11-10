import * as React from 'react';
import { LanguageContext } from '../context/LanguageContext';
import * as lo from 'lodash';
import * as predefinedLang from '../lang';
export default (props) => {
    let { children, ...lang } = props;
    lang = lo.merge(lang, predefinedLang);
    let languageCode = "en";
    let setLanguageCode = (newCode: string) => {
        languageCode = newCode;
    };

    return <LanguageContext.Provider value={{
        languageCode,
        setLanguageCode,
        language: lang
    }}>{children}</LanguageContext.Provider>;
};