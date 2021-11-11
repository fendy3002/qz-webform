import * as types from '../types';
const arrangeGrid = (elements: types.Element[], setting: types.ElementBuilder.AutoGridSetting) => {
    let innerArrange = (elements: types.Element[]) => {
        let result = [];
        let rowIndex = 0;
        let colIndex = 0;
        let rowBuffer = [];

        const groupAsRow = (elements) => {
            return {
                tagName: setting.rowTagName ?? "row",
                props: {},
                children: elements
            };
        };
        const groupAsColumn = (elements) => {
            return {
                tagName: setting.columnTagName ?? "column",
                props: {},
                children: elements.map(elem => {
                    return {
                        ...elem,
                        props: {
                            ...elem.props,
                            columnWidth: Math.floor(100 / setting.columnCount)
                        }
                    };
                }),
            };
        };
        let pushRow = () => {
            if (rowBuffer.length > 0) {
                result.push(
                    groupAsRow(
                        rowBuffer.map(k => groupAsColumn([k]))
                    )
                );
            }
            colIndex = 0;
            rowIndex++;
            rowBuffer = [];
        }
        for (let each of elements) {
            if (each.tagName == (setting.rowBreakTagName ?? "rowbreak")) {
                pushRow();
                continue;
            }
            if (each.tagName == (setting.hrTagName ?? "hr")) {
                pushRow();
                result.push({
                    ...each
                });
                continue;
            }
            if (each.tagName == (setting.fullColumnTagName ?? "fullcolumn")) {
                pushRow();
                result.push({
                    ...each,
                    children: each.children.map(child => {
                        return {
                            ...child,
                            props: {
                                ...child.props,
                                columnWidth: 100
                            }
                        };
                    })
                });
                continue;
            }
            if (each.children && each.tagName != (setting.cellTagName ?? "cell")) {
                each.children = innerArrange(each.children);
            }

            rowBuffer.push(each);
            if (colIndex == setting.columnCount - 1) {
                pushRow();
            } else {
                colIndex++;
            }
        }
        pushRow();

        return result;
    }
    return innerArrange(elements);
};
const prepareData = (elements: types.Element[], value) => {
    let result: any = value;
    for (let each of elements) {
        if (each.name) {
            result[each.name] = value[each.name] ?? "";
            if (each.props.labelfield) {
                result[each.props.labelfield] = value[each.props.labelfield] ?? "";
            }
        }
        if (each.children) {
            result = {
                ...result,
                ...prepareData(each.children, value)
            };
        }
    }
    return result;
};
const setId = (elements: types.Element[], setting: types.ElementBuilder.ElementBuilderSetting, idPrefix = "") => {
    let elemMap: {
        [id: string]: types.Element[]
    } = {};
    let elemIndex = 0;
    for (let each of elements) {
        if (setting?.autoLabel ?? true) {
            each.props.label = each.props.label ?? each.name;
        }
        if (setting?.autoPlaceholder ?? true) {
            each.props.placeholder = each.props.placeholder ?? each.props.label ?? each.name;
        }
        if (!each.id) {
            each.id = each.tagName + "_" + [idPrefix, elemIndex.toString()].filter(k => k).join("_");
            elemIndex++;
        }
        elemMap[each.id] = elemMap[each.id] ?? [];
        if (each.children && each.children.length > 0) {
            let childrenResult = setId(each.children, setting, [idPrefix, elemIndex.toString()].filter(k => k).join("_"));
            elemMap = {
                ...elemMap,
                ...childrenResult.elemMap
            };
            each.children = childrenResult.elements;
        }
    }
    return {
        elemMap,
        elements
    };
}
class ElementBuilder {
    constructor(elements: types.Element[], setting?: types.ElementBuilder.ElementBuilderSetting) {
        this.elements = elements;
        this.setting = setting;
        [
            "withAutoGrid"
        ].forEach(k => {
            this[k] = this[k].bind(this);
        })
    }
    elements: types.Element[] = null;
    setting: types.ElementBuilder.ElementBuilderSetting = null;
    autoGridSetting: types.ElementBuilder.AutoGridSetting = null;
    withAutoGrid(setting?: types.ElementBuilder.AutoGridSetting) {
        this.autoGridSetting = setting ?? {
            columnCount: 2,
            columnTagName: "column",
            rowBreakTagName: "rowbreak",
            rowTagName: "row",
            fullColumnTagName: "fullcolumn",
            cellTagName: "cell"
        };
        return this;
    }
    build(initialData: any) {
        let resultElements = this.elements;
        for (let each of resultElements) {
            each.props = {
                ...each.props,
                required: each.validation?.required,
                readonly: each.validation?.readonly,
                hidden: each.validation?.hidden,
            };
        }
        if (this.autoGridSetting) {
            resultElements = arrangeGrid(resultElements, this.autoGridSetting);
        }
        let setIdResult = setId(resultElements, this.setting);
        resultElements = setIdResult.elements;

        return {
            Elements: resultElements,
            data: prepareData(this.elements, initialData),
        };
    }
};
export const elementBuilder = (elements: types.Element[], setting?: types.ElementBuilder.ElementBuilderSetting) => {
    return new ElementBuilder(elements, setting);
};