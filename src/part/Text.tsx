import * as React from 'react';
import * as types from '../types';

const HOC = ({ Element, Component, onChange, data, ...props }: types.ComponentProps) => {
    let componentOnChange = (evt) => {
        let value = evt.currentTarget.value;
        let error = "";



        return onChange({
            data: {
                [Element.name]: value
            },
            error: {
                [Element.name]: error
            }
        });
    };
    let propsToPass = {
        required: Element.validation?.required,
        readonly: Element.validation?.readonly,
        hidden: Element.validation?.hidden,
        value: data[Element.name],
        ...Element.props,
        onChange: componentOnChange,
    };

    return <Component {...propsToPass}></Component>;
};
let validation = ({ Element, data, value }) => {

};
let Part = {
    HOC,
    validation
};
export {
    Part as Text
}