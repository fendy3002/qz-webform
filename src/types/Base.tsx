/**
 * Webform element type
 * @memberof types
 * @alias Element
 */
export interface Element {
    /**
     * id of element, used in both html and webform context
     */
    id?: string,
    /**
     * name of element, used in both html and webform data handling
     */
    name?: string,
    /**
     * tagname
     */
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
