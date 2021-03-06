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
export const reactselect: types.Static.CustomParser = (props, tools) => {
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
    result = merge({}, result, predefinedParser.inputParser(props, tools));
    
    return result;
};
export const reactselectasync: types.Static.CustomParser = (props, tools) => {
    let { Element, xml } = props
    let result = {
        ...Element,
    };
    result = merge({}, result, predefinedParser.inputParser(props, tools));
    
    return result;
};