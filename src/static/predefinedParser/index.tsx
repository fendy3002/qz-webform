import * as types from '../../types';
import { merge } from 'lodash';

const inputParser = (props, tools) => {
    let { Element, xml } = props
    let result: any = {
        validation: {}
    };
    if (xml.hasOwnProperty("readonly")) {
        result.validation.readonly = true;
    }
    if (!xml.hasOwnProperty("editable")) {
        result.validation.editable = true;
    }
    if (!xml.hasOwnProperty("hidden")) {
        result.validation.hidden = true;
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
