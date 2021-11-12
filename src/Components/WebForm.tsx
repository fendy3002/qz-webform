import * as React from 'react';
import PartsProvider from '../provider/partsProvider';
import LanguageProvider from '../provider/languageProvider';
import { ElementComponent } from './ElementComponent';
import * as types from '../types';
export interface WebFormProps {
    Elements: types.Element[],
    Parts?: types.Part.CustomPartSet,
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
    readonly?: boolean
};
export const WebForm = (props: WebFormProps) => {
    let { Elements, Parts, data, error, readonly, Language, LanguageCode,
        onChange } = props;
    return <PartsProvider {...Parts}>
        <LanguageProvider lang={Language} languageCode={LanguageCode}>
            {Elements.map(k => {
                return <ElementComponent key={k.id} readonly={readonly}
                    Element={k} onChange={onChange} data={data} error={error}></ElementComponent>
            })}
        </LanguageProvider>
    </PartsProvider>;
};