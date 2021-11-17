import * as React from 'react';
import { ElementComponent } from '../Components/ElementComponent';
import * as types from '../types';

let validation = ({ Element, data, value }: types.Part.ValidationProps) => {
    return null;
};
const Logic = ({ Element, Component, onChange, data, error, children, ...props }: types.Part.LogicProps) => {
    let propsToPass = {
        ...Element.props,
        CustomComponent: Element.context.Component
    };

    return <Component {...propsToPass}>{children}</Component>;
};
const Component = ({ CustomComponent, children }) => {
    return <CustomComponent>{children}</CustomComponent>;
};
let Part: types.Part.Part = {
    Component,
    Logic,
    validation
};
export {
    Part as customcomponent
};