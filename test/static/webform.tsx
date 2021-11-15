import { renderStatic } from '../../src/index';
import part from './part';
import * as customParser from './customParser';
const render = () => {
    return renderStatic().withParts(part).withCustomParser(customParser).withLanguageCode("en");
};
(window as any).QzWebForm = render;