import * as React from 'react';
import * as types from '../types';
import * as lang from '../lang';

export interface LanguageContextType {
    languageCode: string,
    setLanguageCode: (newCode: string) => void,
    language: {
        [language: string]: types.Language.LanguagePack
    }
};
export const LanguageContext = React.createContext<LanguageContextType>({
    languageCode: "en",
    setLanguageCode: (newCode) => { },
    language: lang
});