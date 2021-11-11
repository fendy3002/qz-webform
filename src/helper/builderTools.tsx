import * as types from '../types';
export const FullColumn = (child: types.Element) => {
    return {
        tagName: "fullcolumn",
        props: {},
        children: [child]
    };
};
export const RowBreak = () => {
    return {
        tagName: "rowbreak",
        props: {},
    };
};
export const HR = () => {
    return {
        tagName: "hr",
        props: {},
    };
};
export const Cell = (children: types.Element[]) => {
    return {
        tagName: "cell",
        props: {},
        children: children
    };
};