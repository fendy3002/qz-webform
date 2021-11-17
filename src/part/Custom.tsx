import * as React from 'react';
import * as types from '../types';

let validation = ({ Element, data, value }: types.Part.ValidationProps) => {
    return null;
};
const Logic = ({ Element, Component, onChange, data, error, children, ...props }: types.Part.LogicProps) => {
    let propsToPass = {
        ...Element.props,
        ...Element.validation,
        CustomComponent: Element.context.Component,
        data, error
    };

    return <Component {...propsToPass}>{children}</Component>;
};
const Component = ({ CustomComponent, children, ...props }) => {
    return <CustomComponent {...props}>{children}</CustomComponent>;
};
let Part: types.Part.Part = {
    Component,
    Logic,
    validation
};
export {
    Part as custom
};