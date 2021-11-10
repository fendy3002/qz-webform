import * as React from 'react';
import { LanguagePack } from '../types';
import * as lang from '../lang';

export interface LangContextType {
    [language: string]: LanguagePack
}
export const LangContext = React.createContext<LangContextType>(lang);