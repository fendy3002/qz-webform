import * as types from '../../types';
import { merge } from 'lodash';

export const inputParser: types.Static.CustomParser = (props, tools) => {
    let { Element, xml } = props;
    let result: any = {
        validation: {}
    };
    if (Element.props.hasOwnProperty("readonly")) {
        result.validation.readonly = true;
    }
    if (Element.props.hasOwnProperty("required")) {
        result.validation.required = true;
    }
    if (Element.props.hasOwnProperty("editable")) {
        result.validation.editable = true;
    }
    if (Element.props.hasOwnProperty("hidden")) {
        result.validation.hidden = true;
    }
    if (Element.context?.readonly) {
        Element.validation.readonly = Element.context.readonly;
    }
    if (Element.context?.hidden) {
        Element.validation.hidden = Element.context.hidden;
    }
    if (Element.context?.required) {
        Element.validation.required = Element.context.required;
    }
    if (Element.context?.editable) {
        Element.validation.editable = Element.context.editable;
    }
    return result;
};
const textAndTextArea = (props, tools) => {
    let { Element, xml } = props
    let result = {
        ...Element
    };
    result = merge({}, result, inputParser(props, tools));
    if (result.props.hasOwnProperty("uppercase")) {
        result.props.uppercase = true;
    }
    if (result.props.hasOwnProperty("lowercase")) {
        result.props.lowercase = true;
    }
    return result;
};
export const text: types.Static.CustomParser = textAndTextArea;
export const textarea: types.Static.CustomParser = textAndTextArea;
export const number: types.Static.CustomParser = (props, tools) => {
    let { Element, xml } = props
    let result = {
        ...Element
    };
    result = merge({}, result, inputParser(props, tools));
    return result;
};
export const select: types.Static.CustomParser = (props, tools) => {
    let { Element, xml } = props
    let options = [];
    for (let each of xml.$$) {
        options.push({
            value: each.$?.value ?? "",
            label: each._
        })
    }
    let result = {
        ...Element,
        context: {
            options: options
        }
    };
    result = merge({}, result, inputParser(props, tools));
    return result;
};
export const cell: types.Static.CustomParser = (props, tools) => {
    let { Element, xml } = props
    let result = {
        ...Element,
        children: xml.$$?.map(k => tools.parseChild(k)),
    };
    return result;
};
export const fullcolumn: types.Static.CustomParser = (props, tools) => {
    let { Element, xml } = props
    let result = {
        ...Element,
        children: xml.$$?.map(k => tools.parseChild(k)),
    };
    return result;
};
