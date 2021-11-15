import { merge } from 'lodash';
import { predefinedParser, types } from '../../../src';
export const reactdatepicker: types.Static.CustomParser = (props, tools) => {
    let { Element, xml } = props
    let options = [];
    let result = {
        ...Element,
        context: {
            options: options
        }
    };
    result = merge({}, result, predefinedParser.inputParser(props, tools));
    return result;
};