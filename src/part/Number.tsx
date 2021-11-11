import * as React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import * as types from '../types';

const isNumeric = (value) => {
    return !isNaN(value - parseFloat(value));
};
let validation = ({ Element, data, Language, value }: types.Part.ValidationProps) => {
    if (Element.validation?.required && (value == null || value == "")) {
        return Language["number"]?.["required"].replace("{field}", Element.name);
    }
    if (value) {
        if (!isNumeric(value)) {
            return Language["number"]?.["format"].replace("{field}", Element.name);
        }
        else if (Element.validation?.min && parseFloat(value) < Element.validation?.min) {
            return Language["number"]?.["min"]
                .replace("{field}", Element.name)
                .replace("{min}", Element.validation?.min);
        } else if (Element.validation?.max && parseFloat(value) > Element.validation?.max) {
            return Language["number"]?.["max"]
                .replace("{field}", Element.name)
                .replace("{max}", Element.validation?.max);
        }
    }

    return "";
};
const Logic = ({ Element, Component, onChange, data, error, ...props }: types.Part.LogicProps) => {
    const Language = useLanguage();
    let componentOnChange = (evt) => {
        let value = evt.currentTarget.value;
        return onChange({
            data: {
                [Element.name]: value
            },
            error: {
                [Element.name]: validation({
                    Element, data, value, Language
                }) ?? ""
            }
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
    return <input name={name} value={value} onChange={onChange} />;
};
let Part: types.Part.Part = {
    Component,
    Logic,
    validation
};
export {
    Part as number
};