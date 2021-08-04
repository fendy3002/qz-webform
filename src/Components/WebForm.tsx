import * as React from 'react';

let construct = (template) => {
    let WebForm = ({ elements, data, error, parentKey = "", onChange }) => {
        let elementDoms = [];
        let keyIndex = 0;
        for (let each of elements) {
            let key = parentKey + "_" + keyIndex;
            let Tag = template[each.tagName];
            if (each.children) {
                elementDoms.push(<Tag data={data} key={key}>
                    <WebForm elements={each.children} error={error} data={data} parentKey={parentKey + "x"}
                        onChange={onChange} />
                </Tag>);
            } else {
                let additional: any = {};
                if (each.tagName == "select") {
                    if (each.options) { additional.options = each.options; }
                    else if (each.groupedOptions) { additional.groupedOptions = each.groupedOptions; }
                }
                let elemName = each.props?.name ?? "";
                elementDoms.push(
                    <Tag data={data} {...each.props} {...additional} error={error[elemName]} value={data[elemName]} key={key} onChange={onChange} />
                );
            }
            keyIndex++;
        }
        return elementDoms;
    };

    return WebForm;
}
export default construct;