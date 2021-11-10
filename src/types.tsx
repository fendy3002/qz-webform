import * as react from 'react';
export interface Element {
    id?: string,
    name?: string,
    tagName: string,
    props: {
        [key: string]: any,
    },
    children?: Element[],
    validation: {
        required: boolean | ((data: any) => boolean),
        readonly: boolean | ((data: any) => boolean),
        editable?: boolean,
        hidden?: boolean | ((data: any) => boolean),
        [key: string]: any,
    },
    context?: {
        [id: string]: any
    }
};
export interface ElementComponentProps {
    id?: string,
    name?: string,
    tagName: string,
    props: {
        [key: string]: any,
    },
    children?: Element[],
    validation: {
        required: boolean,
        readonly: boolean,
        hidden: boolean,
        [key: string]: any,
    },
    context?: {
        [id: string]: any
    }
};
export interface ComponentProps {
    Element: ElementComponentProps,
    Component: react.ComponentClass,
    data: any,
    onChange?: (props: {
        data: any,
        error: {
            [key: string]: string
        }
    }) => void,
};