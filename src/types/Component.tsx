import * as Base from './Base';

export interface ElementProps {
    id?: string,
    name?: string,
    tagName: string,
    props: {
        [key: string]: any,
    },
    children?: Base.Element[],
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