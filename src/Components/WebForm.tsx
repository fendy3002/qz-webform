import * as React from 'react';

let construct = (template) => {
    let WebForm = ({ elements, data, parentKey = "", onChange }) => {
        let elementDoms = [];
        let keyIndex = 0;
        for (let each of elements) {
            let key = parentKey + "_" + keyIndex;
            let Tag = template[each.tagName];
            if (each.children) {
                elementDoms.push(<Tag data={data} key={key}>
                    <WebForm elements={each.children} data={data} parentKey={parentKey + "x"} onChange={onChange}/>
                </Tag>);
            } else {
                elementDoms.push(
                    <Tag data={data} {...each.props} key={key} onChange={onChange}/>
                );
            }
            keyIndex++;
        }
        return elementDoms;
    };

    return WebForm;
}
export default construct;