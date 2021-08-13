import * as React from 'react';
import memoize from 'lodash/memoize';

let construct = (template) => {
    class WebForm extends React.Component {

        reactSelectOnChange = memoize((element) => {
            let dataset: any = {};
            for (let key of Object.keys(element.props.dataset ?? {})) {
                dataset[key.replace("data-", "")] = element.props.dataset[key];
            }
            return (selected) => {
                const { onChange } = this.props;
                onChange({
                    currentTarget: {
                        name: element.props.name,
                        value: selected.value,
                        dataset: dataset ?? {}
                    }
                });
            };
        });
        render() {
            const { structure, data, error, context, parentKey = "", onChange } = this.props;
            let elementDoms = [];
            let keyIndex = 0;
            for (let each of structure) {
                let key = parentKey + "_" + keyIndex;
                let Tag = template[each.tagName];
                if (each.children) {
                    elementDoms.push(<Tag data={data} key={key}>
                        <WebForm structure={each.children} error={error} data={data} context={context}
                            parentKey={parentKey + "x"}
                            onChange={onChange} />
                    </Tag>);
                } else {
                    let additional: any = {};
                    let tagContext = context[each.id];
                    if (each.tagName == "reactselect") {
                        if (each.options) { additional.options = each.options; }
                        else if (each.groupedOptions) { additional.groupedOptions = each.groupedOptions; }

                        let elemName = each.props?.name ?? "";
                        elementDoms.push(
                            <Tag data={data} {...each.props} {...additional} error={error[elemName]} value={data[elemName]} key={key}
                                validation={tagContext?.validation ?? {}}
                                onChange={this.reactSelectOnChange(each)} />
                        );
                    } else if (each.tagName == "reactselectasync") {
                        // if (each.options) { additional.options = each.options; }
                        // else if (each.groupedOptions) { additional.groupedOptions = each.groupedOptions; }

                        // let elemName = each.props?.name ?? "";
                        // elementDoms.push(
                        //     <Tag data={data} {...each.props} {...additional} error={error[elemName]} value={data[elemName]} key={key}
                        //         onChange={this.reactSelectOnChange(elemName)} />
                        // );
                    } else if (each.tagName == "select") {
                        if (each.options) { additional.options = each.options; }
                        else if (each.groupedOptions) { additional.groupedOptions = each.groupedOptions; }

                        let elemName = each.props?.name ?? "";
                        elementDoms.push(
                            <Tag data={data} {...each.props} {...additional} error={error[elemName]} value={data[elemName]}
                                validation={tagContext?.validation ?? {}}
                                key={key}
                                onChange={onChange} />
                        );
                    } else {
                        let elemName = each.props?.name ?? "";
                        elementDoms.push(
                            <Tag data={data} {...each.props} {...additional} error={error[elemName]} value={data[elemName]}
                                validation={tagContext?.validation ?? {}}
                                key={key} onChange={onChange} />
                        );
                    }
                }
                keyIndex++;
            }
            return elementDoms;
        }
    };
    return WebForm;
}
export default construct;