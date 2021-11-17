import * as React from 'react';
import * as types from '../types';

let validation = ({ Element, data, value }: types.Part.ValidationProps) => {
    return null;
};
const Logic = ({ Element, Component, onChange, data, error, children, ...props }: types.Part.LogicProps) => {
    let propsToPass = {
        ...Element.props,
    };

    return <Component {...propsToPass}>{children}</Component>;
};
const Component = ({ children }) => {
    return children;
};
let Part: types.Part.Part = {
    Component,
    Logic,
    validation
};
export {
    Part as cell
};