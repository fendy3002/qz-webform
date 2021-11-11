import * as react from 'react';

export interface Element {
    id?: string,
    name?: string,
    tagName: string,
    props: {
        [key: string]: any,
    },
    children?: Element[],
    validation?: {
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

export namespace Component {
    export interface ElementProps {
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
};
export namespace Part {
    export interface Part {
        HOC: React.ComponentType<HOCProps>,
        validation: (props: ValidationProps) => string
    };
    export interface HOCProps {
        Element: Component.ElementProps,
        Component: react.ComponentType<any>,
        data: any,
        onChange?: (props: {
            data: any,
            error: {
                [key: string]: string
            }
        }) => void,
    };
    export interface ValidationProps {
        Element: Component.ElementProps,
        data: any,
        value: any,
    };
};

export interface LanguagePack {
    [tagName: string]: {
        [validationKey: string]: string
    }
};

export namespace ElementBuilder {
    export interface AutoGridSetting {
        columnCount?: number,
        rowTagName?: string,
        columnTagName?: string,
        fullColumnTagName?: string,
        rowBreakTagName?: string,
        cellTagName?: string
    };
}