import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

let useLanguageCode = () => {
    const lang = useContext(LanguageContext);
    return {
        setLanguageCode: lang.setLanguageCode,
        languageCode: lang.languageCode,
    };
};

export { useLanguageCode };