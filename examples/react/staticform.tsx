import { webform as WebFormConstruct } from '../../src/index';
import template from './template';

let render = (element, value, option?: any) => {
    let WebForm = WebFormConstruct(template, option);
    return WebForm.renderStatic(element, value);
};
export {
    render
};