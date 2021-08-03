import * as React from 'react';
import * as ReactDOM from 'react-dom';

import constructor from './Components/WebForm';
import elementToJson from './helper/elementToJson';
const webform = (template) => {
    const render = (element, value) => {
        elementToJson(element).then((elementsJson) => {
            let WebForm = constructor(template);
            ReactDOM.render(
                <WebForm elements={elementsJson} data={value} />,
                element
            );
        })
    };
    return {
        render
    };
};

export default webform;