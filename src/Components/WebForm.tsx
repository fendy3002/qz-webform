import * as React from 'react';

let construct = (template) => {
    let WebForm = ({ elements, data }) => {
        let elementDoms = [];
        for (let each of elements) {
            let Tag = template[each.tagName];
            elementDoms.push(
                <Tag data={data}/>
            );
        }
        return elementDoms;
    };

    return WebForm;
}
export default construct;