import { useContext } from 'react';
import { LangContext } from '../context/LangContext';

export default (langCode?: string) => {
    const lang = useContext(LangContext);
    if (langCode) {
        return lang[langCode];
    } else {
        return lang["en"];
    }
};