import * as React from 'react';

let construct = (template) => {
    let webForm = ({ elements, data }) => {
        let elementDoms = [];
        for (let each of elements) {
            let Tag = template[each.tagName];
            elementDoms.push(
                <Tag data={data}/>
            );
        }
        return elementDoms;
    };

    return <>
        {webForm}
    </>;
}
export default construct;