import * as React from 'react';
import { memoize } from 'lodash';
import buttonOnClickHandler from '../helper/buttonOnClickHandler';

let construct = (template) => {
    class WebForm extends React.Component<any, any> {
        reactSelectAsyncOnChange = memoize((element) => {
            let dataset: any = {};
            for (let key of Object.keys(element.props.dataset ?? {})) {
                dataset[key.replace("data-", "")] = element.props.dataset[key];
            }
            return (selected) => {
                const { onChange } = this.props;
                onChange({
                    currentTarget: {
                        name: element.props.name,
                        labelfield: element.props.labelfield,
                        value: selected ?? {
                            value: "",
                            label: ""
                        },
                        dataset: dataset ?? {}
                    }
                });
            };
        });

        additionalContextProps = memoize((context) => {
            return (data) => {
                if (!context) { return {}; }
                let result: any = {};
                if (context.hidden) {
                    result.hidden = context.hidden(data);
                }
                if (context.readonly) {
                    result.readonly = context.readonly(data);
                }
                return result;
            };
        });

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
        buttonOnClick = memoize((element, context) => {
            let onClick = context?.button?.onClick;
            let dataset: any = {};
            for (let key of Object.keys(element.props.dataset ?? {})) {
                dataset[key.replace("data-", "")] = element.props.dataset[key];
            }
            return (evt) => {
                if (onClick) {
                    let eventContext = buttonOnClickHandler(this.props);
                    const { data, onChange } = this.props;
                    let clickResult = onClick(evt, {
                        data: data,
                        setData: eventContext.setData,
                        setError: eventContext.setError
                    });
                    if (!clickResult) {
                        clickResult = Promise.resolve();
                    }
                    clickResult.then(() => {
                        onChange({
                            currentTarget: {
                                name: "",
                                value: eventContext.getChange(),
                                dataset: dataset ?? {}
                            }
                        });
                    })
                }
            };
        });
        reactDatepickerOnChange = memoize((element, context) => {
            let dataset: any = {};
            for (let key of Object.keys(element.props.dataset ?? {})) {
                dataset[key.replace("data-", "")] = element.props.dataset[key];
            }
            return (date) => {
                const { onChange } = this.props;
                onChange({
                    currentTarget: {
                        name: element.props.name,
                        value: context.converter.toSource(date),
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
                    let propsSpread = {
                        ...each.props,
                        ...this.additionalContextProps(tagContext)(data)
                    };
                    if (each.tagName == "reactselect") {
                        if (each.options) { additional.options = each.options; }
                        else if (each.groupedOptions) { additional.groupedOptions = each.groupedOptions; }
                        else { additional.options = []; }

                        let elemName = each.props?.name ?? "";
                        elementDoms.push(
                            <Tag data={data} {...propsSpread} {...additional} error={error[elemName]} value={data[elemName]} key={key}
                                validation={tagContext?.validation ?? {}}
                                onChange={this.reactSelectOnChange(each)} />
                        );
                    } else if (each.tagName == "reactselectasync") {
                        let elemName = each.props?.name ?? "";
                        elementDoms.push(
                            <Tag data={data} {...propsSpread} {...additional} error={error[elemName]} value={data[elemName]} key={key}
                                validation={tagContext?.validation ?? {}}
                                loadOptions={tagContext?.select?.loadOptions}
                                selectedLabel={data[each.props.labelfield]}
                                onChange={this.reactSelectAsyncOnChange(each)} />
                        );
                    } else if (each.tagName == "select") {
                        if (each.options) { additional.options = each.options; }
                        else if (each.groupedOptions) { additional.groupedOptions = each.groupedOptions; }
                        else { additional.options = []; }

                        let elemName = each.props?.name ?? "";
                        elementDoms.push(
                            <Tag data={data} {...propsSpread} {...additional} error={error[elemName]} value={data[elemName]}
                                validation={tagContext?.validation ?? {}}
                                key={key}
                                onChange={onChange} />
                        );
                    } else if (each.tagName == "button") {
                        elementDoms.push(
                            <Tag data={data} {...propsSpread} {...additional}
                                key={key} onClick={this.buttonOnClick(each, tagContext)} />
                        );
                    } else if (each.tagName == "reactdatepicker") {
                        let elemName = each.props?.name ?? "";
                        let converter = tagContext.converter;
                        elementDoms.push(
                            <Tag data={data} {...propsSpread} {...additional} error={error[elemName]} value={converter.fromSource(data[elemName])}
                                originalValue={data[elemName]}
                                validation={tagContext?.validation ?? {}}
                                key={key} onChange={this.reactDatepickerOnChange(each, tagContext)} />
                        );
                    } else if (each.tagName == "file") {
                        let elemName = each.props?.name ?? "";
                        let urlField = each.props?.urlfield ?? "";
                        let labelField = each.props?.labelfield ?? "";

                        elementDoms.push(
                            <Tag data={data} {...propsSpread} {...additional} error={error[elemName]} url={data[urlField]}
                                linkLabel={data[labelField]}
                                validation={tagContext?.validation ?? {}}
                                key={key} onChange={onChange} />
                        );
                    } else {
                        let elemName = each.props?.name ?? "";
                        elementDoms.push(
                            <Tag data={data} {...propsSpread} {...additional} error={error[elemName]} value={data[elemName]}
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
    return WebForm as any;
}
export default construct;