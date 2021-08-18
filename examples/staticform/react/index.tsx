import { fromTemplate } from '../../../src/index';
import template from '../../react/template';

let render = (element, value, option?: any) => {
    return fromTemplate(template, option)
        .elementStructure(element).render(value);
};
(window as any).QzWebForm = {
    render
};