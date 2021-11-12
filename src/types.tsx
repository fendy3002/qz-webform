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
        required?: boolean | ((data: any) => boolean),
        readonly?: boolean | ((data: any) => boolean),
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
        }) => void,
    };
    export interface ValidationProps {
        Element: Component.ElementProps,
        data: any,
        value: any,
        Language: LanguagePack
    };
};

export interface LanguagePack {
    [tagName: string]: {
        [validationKey: string]: string
    }
};
export interface LanguageCodePack {
    [languageCode: string]: LanguagePack
};
export namespace ElementBuilder {
    export interface ElementBuilderSetting {
        autoLabel?: boolean,
        autoPlaceholder?: boolean,
    };
    export interface AutoGridSetting {
        columnCount?: number,
        rowTagName?: string,
        columnTagName?: string,
        hrTagName?: string,
        fullColumnTagName?: string,
        rowBreakTagName?: string,
        cellTagName?: string
    };
}