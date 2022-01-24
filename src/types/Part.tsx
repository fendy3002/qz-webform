import * as react from 'react';
import * as Component from './Component';
import * as Language from './Language';

export interface Part {
    Component: React.ComponentType<any>,
    Logic: React.ComponentType<LogicProps>,
    validation: (props: ValidationProps) => { [elemName: string]: string }
};
export interface CustomPart {
    Component?: React.ComponentType<any>,
    Logic?: React.ComponentType<LogicProps>,
    validation?: (props: ValidationProps) => { [elemName: string]: string }
};
export interface CustomPartSet {
    [tagName: string]: CustomPart
};
export interface LogicProps {
    Element: Component.ElementProps,
    Component: react.ComponentType<any>,
    children: any,
    data: any,
    error: {
        [key: string]: string
    },
    onChange?: (props: {
        data: any,
        error: {
            [key: string]: string
        }
    }, autorunHandler?: any) => void,
};
export interface ValidationProps {
    Element: Component.ElementProps,
    data: any,
    value: any,
    Language: Language.LanguagePack
};