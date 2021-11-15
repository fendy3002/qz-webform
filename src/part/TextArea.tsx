import * as React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { makeError, makeNoError } from '../builder/tools';
import * as types from '../types';

let validation = ({ Element, data, Language, value }: types.Part.ValidationProps) => {
    if (Element.validation?.required && (value == null || value == "")) {
        return makeError(Element.name,
            Language["textarea"]?.["required"].replace("{field}", Element.props.label)
        );
    } else if (Element.validation?.minlength && (value ?? "").length < Element.validation?.minlength) {
        return makeError(Element.name,
            Language["textarea"]?.["minlength"]
                .replace("{field}", Element.props.label)
                .replace("{minlength}", Element.validation?.minlength)
        );
    } else if (Element.validation?.maxlength && (value ?? "").length > Element.validation?.maxlength) {
        return makeError(Element.name,
            Language["textarea"]?.["maxlength"]
                .replace("{field}", Element.props.label)
                .replace("{maxlength}", Element.validation?.maxlength)
        );
    }
    return makeNoError(Element.name);
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
                ...(validation({
                    Element, data, value, Language
                }) ?? {})
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
    return <textarea name={name} onChange={onChange} value={value}></textarea>;
};
let Part: types.Part.Part = {
    Component,
    Logic,
    validation
};
export {
    Part as textarea
};