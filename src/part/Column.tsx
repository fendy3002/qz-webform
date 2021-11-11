import * as React from 'react';
import * as types from '../types';

let validation = ({ Element, data, value }: types.Part.ValidationProps) => {
    return "";
};
const Logic = ({ Element, Component, onChange, data, children, ...props }: types.Part.LogicProps) => {
    let propsToPass = {
        ...Element.props,
    };

    return <Component {...propsToPass}>{children}</Component>;
};
const Component = ({ columnWidth, children }) => {
    let columnSize = (columnWidth == 33) ? "4" :
        (columnWidth == 25) ? "3" : "6";
    return <div className={"col-md-" + columnSize}>{children}</div>;
};
let Part: types.Part.Part = {
    Component,
    Logic,
    validation
};
export {
    Part as column
};