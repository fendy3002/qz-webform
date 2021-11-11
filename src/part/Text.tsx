import * as React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import * as types from '../types';

let validation = ({ Element, data, Language, value }: types.Part.ValidationProps) => {
    if (Element.validation?.required && (value == null || value == "")) {
        return Language["text"]?.["required"].replace("{field}", Element.name);
    } else if (Element.validation?.minlength && (value ?? "").length < Element.validation?.minlength) {
        return Language["text"]?.["minlength"]
            .replace("{field}", Element.name)
            .replace("{minlength}", Element.validation?.minlength);
    } else if (Element.validation?.maxlength && (value ?? "").length > Element.validation?.maxlength) {
        return Language["text"]?.["maxlength"]
            .replace("{field}", Element.name)
            .replace("{maxlength}", Element.validation?.maxlength);
    }
    return "";
};
const Logic = ({ Element, Component, onChange, data, error, ...props }: types.Part.LogicProps) => {
    const Language = useLanguage();
    let componentOnChange = (evt) => {
        let value = evt.currentTarget.value;
        if (Element.props.uppercase) {
            value = value.toUpperCase();
        } else if (Element.props.lowercase) {
            value = value.toLowerCase();
        }

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
    Part as text
};