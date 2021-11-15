import { renderStatic } from '../../src/index';
import part from './part';
const render = () => {
    return renderStatic().withParts(part).withLanguageCode("en");
};
(window as any).QzWebForm = render;