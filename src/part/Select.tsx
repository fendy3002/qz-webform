import * as React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { makeError, makeNoError } from '../builder/tools';
import * as types from '../types';

let validation = ({ Element, data, Language, value }: types.Part.ValidationProps) => {
    if (Element.validation?.required && (value == null || value == "")) {
        return makeError(Element.name,
            Language["select"]?.["required"].replace("{field}", Element.props.label)
        );
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
        options: Element.context.options,
        ...Element.props,
        data,
        error: error[Element.name],
        onChange: componentOnChange,
    };

    return <Component {...propsToPass}></Component>;
};
const Component = ({ name, label, value, options, readonly, onChange }) => {
    if (readonly) {
        return <input readOnly={true} value={options.find(k => k.value == value).label} />;
    } else {
        return <select name={name} value={value} onChange={onChange}>
            {options.map(k => <option value={k.value} key={k.value ?? k.label}>{k.label}</option>)}
        </select>;
    }
};
let Part: types.Part.Part = {
    Component,
    Logic,
    validation
};
export {
    Part as select
};