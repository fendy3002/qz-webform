import { merge } from 'lodash';
import { predefinedParser, types } from '../../../src';
export const reactdatepicker: types.Static.CustomParser = (props, tools) => {
    let { Element, xml } = props
    let result = {
        ...Element,
    };
    result = merge({}, result, predefinedParser.inputParser(props, tools));
    if (result.props.hasOwnProperty("clearable")) {
        result.props.clearable = true;
    }
    return result;
};