interface DataBooleanHandler {
    (data: any): boolean
}
/**
 * Element context
 */
export interface Context {
    /**
     * id of element
     */
    [id: string]: any
};

/**
 * Webform element type
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
     * html or component tagname, used in choosing part component
     */
    tagName: string,
    /**
     * props passed to html / xml component, or processed using parser
     */
    props: {
        [key: string]: any,
    },
    /**
     * base Element children
     */
    children?: Element[],
    /**
     * validation populated by parser
     */
    validation?: {
        /**
         * whether component value is required
         */
        required?: boolean | DataBooleanHandler,
        /**
         * whether component is readonly
         */
        readonly?: boolean | DataBooleanHandler,
        /**
         * if true it'll override the readonly property as false
         */
        editable?: boolean,
        /**
         * whether component is hidden
         */
        hidden?: boolean | DataBooleanHandler,
        [key: string]: any,
    },
    /**
     * context of element, provided by static context
     */
    context?: Context
};
