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
interface IMakeError {
    (name: string, error?: string): { [key: string]: string }
};
export const makeError: IMakeError = (name: string, error?: string) => { return { [name]: error }; }

interface IMakeNoError {
    (name: string): { [key: string]: string }
};
export const makeNoError: IMakeNoError = (name: string) => { return { [name]: "" }; }