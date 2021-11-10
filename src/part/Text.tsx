import * as React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import * as types from '../types';

let validation = ({ Element, data, value, languageCode }: types.ValidationProps) => {
    const Language = useLanguage(languageCode);
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
const HOC = ({ Element, Component, onChange, data, languageCode, ...props }: types.ComponentProps) => {
    let componentOnChange = (evt) => {
        let value = evt.currentTarget.value;
        if (Element.conversion?.uppercase) {
            value = value.toUpperCase();
        } else if (Element.conversion?.lowercase) {
            value = value.toLowerCase();
        }

        return onChange({
            data: {
                [Element.name]: value
            },
            error: {
                [Element.name]: validation({
                    Element, data, value, languageCode
                }) ?? ""
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
let Part = {
    HOC,
    validation
};
export {
    Part as Text
};