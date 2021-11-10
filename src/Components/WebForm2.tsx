import * as React from 'react';
import PartsProvider from '../provider/partsProvider';
import LanguageProvider from '../provider/languageProvider';
import { TemplateContext } from '../context/TemplateContext'
import * as types from '../types';
export interface PropsType {
    Elements: types.Element[],
    Template: {
        [tagName: string]: React.ComponentType<any>
    },
    Parts?: {
        [tagName: string]: types.Part.Part
    },
    Language?: {
        [languageCode: string]: types.LanguagePack
    },
    LanguageCode?: string,
    data: any,
    error: any,
    onChange: (props: {
        data: any,
        error: {
            [key: string]: string
        }
    }) => void,
};
export const WebForm = (props: PropsType) => {
    let { Elements, Template, Parts, data, error, Language, LanguageCode,
        onChange } = props;
    for (let element of Elements) {

    }
    return <TemplateContext.Provider value={{ template: Template }}>
        <PartsProvider parts={Parts}>
            <LanguageProvider lang={Language} languageCode={LanguageCode}>
                
            </LanguageProvider>
        </PartsProvider>
    </TemplateContext.Provider>;
};