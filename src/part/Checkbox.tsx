import * as React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import * as types from '../types';

let validation = ({ Element, data, Language, value }: types.Part.ValidationProps) => {
    return null;
};
const Logic = ({ Element, Component, onChange, data, error, ...props }: types.Part.LogicProps) => {
    let componentOnChange = (evt) => {
        let value = evt.currentTarget.checked;

        return onChange({
            data: {
                [Element.name]: value
            },
            error: {}
        });
    };
    let propsToPass = {
        value: data[Element.name],
        error: error[Element.name],

        ...Element.props,
        onChange: componentOnChange,
    };

    return <Component {...propsToPass}></Component>;
};
const Component = ({ name, label, value, onChange }) => {
    return <input type="checkbox" name={name} checked={value} onChange={onChange} />;
};
let Part: types.Part.Part = {
    Component,
    Logic,
    validation
};
export {
    Part as checkbox
};