import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

let useLanguage = () => {
    const lang = useContext(LanguageContext);

    return lang.language[lang.languageCode];
};

export { useLanguage };