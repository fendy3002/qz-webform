import * as React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { makeError, makeNoError } from '../builder/tools';
import * as types from '../types';

const isNumeric = (value) => {
    return !isNaN(value - parseFloat(value));
};
let validation = ({ Element, data, Language, value }: types.Part.ValidationProps) => {
    if (Element.validation?.required && (value == null || value == "")) {
        return makeError(Element.name,
            Language["number"]?.["required"].replace("{field}", Element.props.label)
        );
    }
    if (value) {
        if (!isNumeric(value)) {
            return makeError(Element.name,
                Language["number"]?.["format"].replace("{field}", Element.props.label)
            );
        }
        else if (Element.validation?.min && parseFloat(value) < Element.validation?.min) {
            return makeError(Element.name,
                Language["number"]?.["min"]
                    .replace("{field}", Element.props.label)
                    .replace("{min}", Element.validation?.min)
            );
        } else if (Element.validation?.max && parseFloat(value) > Element.validation?.max) {
            return makeError(Element.name,
                Language["number"]?.["max"]
                    .replace("{field}", Element.props.label)
                    .replace("{max}", Element.validation?.max)
            );
        }
    }

    return makeNoError(Element.name);
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