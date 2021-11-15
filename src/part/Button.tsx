import * as React from 'react';
import * as types from '../types';

let validation = ({ Element, data, value }: types.Part.ValidationProps) => {
    return null;
};
const Logic = ({ Element, Component, onChange, data, children, ...props }: types.Part.LogicProps) => {
    let propsToPass = {
        ...Element.props,
        data,
        onChange,
        onClick: Element.context?.onClick
    };

    return <Component {...propsToPass}>{children}</Component>;
};
const Component = ({ onClick, data, onChange, readonly, label }) => {
    if (readonly) {
        return <button disabled={true}>{label}</button>;
    } else {
        return <button onClick={(evt) => onClick(evt, { data, onChange })}>{label}</button>;
    }
};
let Part: types.Part.Part = {
    Component,
    Logic,
    validation
};
export {
    Part as button
};