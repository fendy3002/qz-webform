import * as React from 'react';

let construct = (template) => {
    let WebForm = ({ elements, data }) => {
        let elementDoms = [];
        let rowIndex = 0;
        let colIndex = 0;

        for (let each of elements) {
            let Tag = template[each.tagName];
            if (each.children) {
                elementDoms.push(<Tag data={data}>
                    <WebForm elements={each.children} data={data} />
                </Tag>);
            } else {
                elementDoms.push(
                    <Tag data={data} {...each.props} />
                );
            }
        }
        return elementDoms;
    };

    return WebForm;
}
export default construct;