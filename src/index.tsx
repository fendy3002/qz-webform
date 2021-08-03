import * as React from 'react';
import * as ReactDOM from 'react-dom';

import constructor from './Components/WebForm';
import elementToJson from './helper/elementToJson';
import arrangeElements from './helper/arrangeElements';
const webform = (template, option?: any) => {
    let useOption = {
        autoGrid: true,
        ...(option ?? {}),
    };
    const render = (element, value) => {
        return elementToJson(element).then((elementsJson) => {
            console.log(elementsJson);
            let elementToRender = elementsJson;
            if (useOption.autoGrid) {
                elementToRender = arrangeElements(elementToRender);
            }
            let WebForm = constructor(template);
            ReactDOM.render(
                <WebForm elements={elementToRender} data={value} />,
                element
            );
        });
    };
    return {
        render
    };
};

export default webform;