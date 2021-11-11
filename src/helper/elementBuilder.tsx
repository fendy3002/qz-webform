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
                children: elements
            };
        };
        const groupAsColumn = (elements) => {
            return {
                tagName: setting.columnTagName ?? "column",
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
        if (each.props?.name) {
            result[each.props.name] = value[each.props.name] ?? "";
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
class ElementBuilder {
    constructor(elements: types.Element[]) {
        this.elements = elements;
        [
            "withAutoGrid"
        ].forEach(k => {
            this[k] = this[k].bind(this);
        })
    }
    elements: types.Element[] = null;
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
    }
    build(initialData: any) {
        let resultElements = this.elements;
        if (this.autoGridSetting) {
            resultElements = arrangeGrid(resultElements, this.autoGridSetting);
        }
        return {
            Elements: resultElements,
            data: prepareData(this.elements, initialData),
        };
    }
};
export const elementBuilder = (elements: types.Element[]) => {
    return new ElementBuilder(elements);
};