import * as React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as dayjs from 'dayjs';
import { useLanguage, makeError, makeNoError, types } from '../../../src';

const ReactDatepickerCustomInput = React.forwardRef((props: any, ref) => {
    let { value, label, isRequired, placeholder, isClearable,
        onChange, onClick } = props;
    let requiredSign = isRequired ? <span className="text-danger">*</span> : <></>;
    let clearOnClick = (evt) => {
        return onChange({
            target: {
                value: ""
            }
        });
    };
    return <>
        <div className="form-floating input-group">
            <input type="text" className={"form-control rounded-0 "}
                value={value} ref={ref} placeholder={placeholder}
                onChange={onChange}
                onClick={onClick}></input>
            {label &&
                <label style={{ zIndex: 3 }}>{label}&nbsp;{requiredSign}</label>
            }
            {isClearable &&
                <button className="btn btn-outline-secondary rounded-0" type="button" onClick={clearOnClick}>x</button>
            }
        </div>
    </>
});

export const reactdatepicker: types.Part.CustomPart = {
    validation: ({ Element, data, Language, value }: types.Part.ValidationProps) => {
        console.log(Element.validation?.required, value)
        if (Element.validation?.required && (value == null || value == "")) {
            return makeError(Element.name,
                Language["text"]?.["required"].replace("{field}", Element.label)
            );
        }
        return makeNoError(Element.name);
    },
    Logic: ({ Element, Component, onChange, data, error, ...props }: types.Part.LogicProps) => {
        const Language = useLanguage();

        let valueConverter = {
            fromSource: (sourceValue: Date | string | number) => sourceValue,
            toSource: (sourceValue: Date): any => sourceValue
        };
        if (Element.props.sourcetype == "iso") {
            valueConverter = {
                fromSource: (sourceValue: Date | string | number) => {
                    return sourceValue ? dayjs(sourceValue).toDate() : null;
                },
                toSource: (sourceValue: Date): any => {
                    return sourceValue ? dayjs(sourceValue).toISOString() : "";
                },
            };
        } else if (Element.props.sourcetype == "timestamp") {
            valueConverter = {
                fromSource: (sourceValue: Date | string | number) => {
                    if (!sourceValue) { return null; }
                    if (typeof sourceValue == "string") {
                        sourceValue = parseInt(sourceValue);
                    }
                    return dayjs(sourceValue).toDate();
                },
                toSource: (sourceValue: Date): any => {
                    return sourceValue ? dayjs(sourceValue).valueOf() : "";
                },
            };
        }
        let componentOnChange = (date) => {
            let value = valueConverter.toSource(date);
            return onChange({
                data: {
                    [Element.name]: value
                },
                error: {
                    ...(reactdatepicker.validation({
                        Element, data, value, Language
                    }) ?? {})
                }
            });
        };

        let propsToPass = {
            value: valueConverter.fromSource(data[Element.name]),
            originalValue: data[Element.name],
            ...Element.props,
            data,
            error: error[Element.name],
            onChange: componentOnChange,
        };

        return <Component {...propsToPass}></Component>;
    },
    Component: ({ name, readonly, value, originalValue, label, error, placeholder, required,
        clearable, onChange }) => {
            console.log(error);
        if (readonly) {
            return <div className="form-floating">
                <input type="text" className={"form-control rounded-0 "}
                    value={dayjs(value).format("YYYY/MM/DD")} readOnly={true} placeholder={placeholder}
                    onChange={onChange} />
                <input type="hidden" name={name} value={originalValue} />
                {label &&
                    <label>{label}</label>
                }
            </div>;
        }
        return <div className="form-floating ">
            <DatePicker className={"form-control rounded-0 " + (error ? "is-invalid" : "")} selected={value}
                dateFormat="yyyy/MM/dd"
                placeholderText={placeholder}
                customInput={<ReactDatepickerCustomInput
                    isClearable={clearable}
                    label={label} isRequired={required} />}
                onChange={onChange} />
            {error &&
                <div className="invalid-feedback">
                    {error}
                </div>
            }
            <input type="hidden" name={name} value={value ? dayjs(value).format("YYYY-MM-dd") : ""} />
        </div>;
    },
}