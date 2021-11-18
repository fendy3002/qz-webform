import * as React from 'react';
import ReactSelect from 'react-select';
import ReactSelectAsync from 'react-select/async';

import { makeError, makeNoError, useLanguage, types } from '../../../src';

const ReactSelectBootstrapStyle = {
    option: (provided, state) => {
        return {
            ...provided,
        };
    },
    control: (provided) => {
        return {
            ...provided,
            borderTopColor: "#fafafa",
            borderLeftColor: "#fafafa",
            borderRightColor: "#f0f0f0",
            borderBottomWidth: "2px",
            boxShadow: "none",
            paddingTop: "18px",
            borderRadius: 0,
        };
    },
    valueContainer: (provided) => {
        return {
            ...provided,
            paddingLeft: "4px"
        };
    },
    singleValue: (provided, state) => {
        return { ...provided };
    }
};
export const reactselect: types.Part.CustomPart = {
    "validation": ({ Element, data, Language, value }: types.Part.ValidationProps) => {
        if (Element.validation?.required && (value == null || value == "")) {
            return makeError(Element.name,
                Language["text"]?.["required"].replace("{field}", Element.props.label)
            );
        }
        return makeNoError(Element.name);
    },
    "Logic": ({ Element, Component, onChange, data, error, ...props }: types.Part.LogicProps) => {
        const Language = useLanguage();
        let componentOnChange = (selected) => {
            return onChange({
                data: {
                    [Element.name]: selected?.value ?? ""
                },
                error: {
                    ...(reactselect.validation({
                        Element, data, value: selected?.value ?? "", Language
                    }) ?? {})
                }
            });
        };
        let propsToPass = {
            value: data[Element.name],
            ...Element.props,
            options: Element.context.options,
            data,
            error: error[Element.name],
            onChange: componentOnChange,
        }
        return <Component {...propsToPass}></Component>;
    },
    "Component": ({ name, readonly, value, label, error, placeholder, dataset, options, required, hidden,
        onChange }) => {
        if (hidden) {
            return <input type="hidden" name={name} value={value} />;
        }
        if (readonly) {
            let selectText = options.find(k => k.value == value)?.label;
            return <div className="form-floating">
                <input type="text" className={"form-control rounded-0 "}
                    value={selectText} readOnly={true} placeholder={placeholder} {...dataset}
                    onChange={onChange} />
                <input type="hidden" name={name} value={value} />
                {label &&
                    <label>{label}</label>
                }
            </div>;
        } else {
            let requiredSign = required ? <span className="text-danger">*</span> : <></>;
            let selectText = options.find(k => k.value == value)?.label;
            return <div className="form-floating">
                <ReactSelect
                    styles={{
                        container: (provided) => {
                            return {
                                ...provided,
                            };
                        },
                        ...ReactSelectBootstrapStyle
                    }}
                    value={{
                        value: value,
                        label: selectText
                    }}
                    className={error ? "is-invalid" : ""}
                    onChange={onChange}
                    options={options}
                    placeholder={placeholder}
                />
                {label &&
                    <label style={{
                        opacity: ".65",
                        transform: "scale(.982) translateY(-.85rem) translateX(-.45rem)"
                    }}>{label}&nbsp;{requiredSign}</label>
                }
                {error &&
                    <div className="invalid-feedback">
                        {error}
                    </div>
                }
                <input type="hidden" name={name} value={value} />
            </div>;
        }
    }
};
export const reactselectasync: types.Part.CustomPart = {
    "validation": ({ Element, data, Language, value }: types.Part.ValidationProps) => {
        if (Element.validation?.required && (value == null || value == "")) {
            return makeError(Element.name,
                Language["text"]?.["required"].replace("{field}", Element.props.label)
            );
        }
        return makeNoError(Element.name);
    },
    "Logic": ({ Element, Component, onChange, data, error, ...props }: types.Part.LogicProps) => {
        const Language = useLanguage();
        let componentOnChange = (selected) => {
            return onChange({
                data: {
                    [Element.name]: selected?.value ?? "",
                    [Element.props.labelfield]: selected?.label ?? ""
                },
                error: {
                    ...(reactselect.validation({
                        Element, data, value: selected?.value ?? "", Language
                    }) ?? {})
                }
            });
        };
        let propsToPass = {
            value: data[Element.name],
            ...Element.props,
            data,
            error: error[Element.name],
            loadOptions: Element.context.loadOptions,
            onChange: componentOnChange,
        }
        return <Component {...propsToPass}></Component>;
    },
    "Component": ({ name, readonly, value, label, error, placeholder, dataset,
        labelfield, selectedLabel, loadOptions, validation,
        onChange }) => {
        if (readonly) {
            let selectText = selectedLabel;
            return <div className="form-floating">
                <input type="text" className={"form-control rounded-0 "}
                    value={selectText} readOnly={true} placeholder={placeholder} {...dataset}
                    onChange={onChange} />
                <input type="hidden" name={name} value={value} />
                {label &&
                    <label>{label}</label>
                }
            </div>;
        } else {
            let requiredSign = validation.required ? <span className="text-danger">*</span> : <></>;
            return <div className="form-floating">
                <ReactSelectAsync
                    styles={{
                        container: (provided) => {
                            return {
                                ...provided,
                            };
                        },
                        ...ReactSelectBootstrapStyle
                    }}
                    value={{
                        value: value,
                        label: selectedLabel
                    }}
                    isClearable={true}
                    className={error ? "is-invalid" : ""}
                    cacheOptions
                    defaultOptions
                    loadOptions={loadOptions}
                    onChange={onChange}
                    placeholder={placeholder}
                />
                {label &&
                    <label style={{
                        opacity: ".65",
                        transform: "scale(.982) translateY(-.85rem) translateX(-.45rem)"
                    }}>{label}&nbsp;{requiredSign}</label>
                }
                {error &&
                    <div className="invalid-feedback">
                        {error}
                    </div>
                }
                <input type="hidden" name={name} value={value} />
                <input type="hidden" name={labelfield} value={selectedLabel} />
            </div>;
        }
    }
};