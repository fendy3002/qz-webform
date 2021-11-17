import * as React from 'react';
import * as types from '../types';

let validation = ({ Element, data, value }: types.Part.ValidationProps) => {
    return null;
};
const Logic = ({ Element, Component, onChange, data, children, ...props }: types.Part.LogicProps) => {
    return <Component {...Element.props}>{children}</Component>;
};
let hLevel = {
    "1": ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    "2": ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    "3": ({ children, ...props }) => <h3 {...props}>{children}</h3>,
    "4": ({ children, ...props }) => <h4 {...props}>{children}</h4>,
    "5": ({ children, ...props }) => <h5 {...props}>{children}</h5>,
    "6": ({ children, ...props }) => <h6 {...props}>{children}</h6>,
};
const Component = ({ level, text, children, ...props }) => {
    let ChosenH = hLevel[level];
    let content = children?.length > 0 ? children : text;
    return <ChosenH>{content}</ChosenH>
};
let Part: types.Part.Part = {
    Component,
    Logic,
    validation
};
export {
    Part as h
};