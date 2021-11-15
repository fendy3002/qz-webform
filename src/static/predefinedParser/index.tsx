import * as types from '../../types';
import { merge } from 'lodash';

const inputParser: types.Static.CustomParser = (props, tools) => {
    let { Element, xml } = props;
    let result: any = {
        validation: {}
    };
    if (xml.hasOwnProperty("readonly")) {
        result.validation.readonly = true;
    }
    if (xml.hasOwnProperty("required")) {
        result.validation.required = true;
    }
    if (xml.hasOwnProperty("editable")) {
        result.validation.editable = true;
    }
    if (xml.hasOwnProperty("hidden")) {
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
    merge({}, result, inputParser(props, tools));
    if (xml.hasOwnProperty("uppercase")) {
        result.props.uppercase = true;
    }
    if (xml.hasOwnProperty("lowercase")) {
        result.props.lowercase = true;
    }
    return result;
};
export const text: types.Static.CustomParser = textAndTextArea;
export const textArea: types.Static.CustomParser = textAndTextArea;
export const number: types.Static.CustomParser = (props, tools) => {
    let { Element, xml } = props
    let result = {
        ...Element
    };
    merge({}, result, inputParser(props, tools));
    return result;
};
export const select: types.Static.CustomParser = (props, tools) => {
    let { Element, xml } = props
    let result = {
        ...Element
    };
    merge({}, result, inputParser(props, tools));
    return result;
};
