import * as React from 'react';
import PartsProvider from '../provider/partsProvider';
import LanguageProvider from '../provider/languageProvider';
import { ElementComponent } from './ElementComponent';
import * as types from '../types';
export interface PropsType {
    Elements: types.Element[],
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
    let { Elements, Parts, data, error, Language, LanguageCode,
        onChange } = props;
    return <PartsProvider parts={Parts}>
        <LanguageProvider lang={Language} languageCode={LanguageCode}>
            {Elements.map(k => {
                return <ElementComponent key={k.id} Element={k} onChange={onChange} data={data} error={error}></ElementComponent>
            })}
        </LanguageProvider>
    </PartsProvider>;
};