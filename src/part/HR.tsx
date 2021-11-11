import * as React from 'react';
import * as types from '../types';

let validation = ({ Element, data, value }: types.Part.ValidationProps) => {
    return "";
};
const Logic = ({ Element, Component, onChange, data, children, ...props }: types.Part.LogicProps) => {
    return <Component>{children}</Component>;
};
const Component = () => {
    return <hr></hr>;
};
let Part: types.Part.Part = {
    Component,
    Logic,
    validation
};
export {
    Part as hr
};