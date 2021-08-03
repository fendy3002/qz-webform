
const groupAsRow = (elements) => {
    return {
        tagName: "row",
        children: elements
    };
};
const groupAsColumn = (elements) => {
    return {
        tagName: "column",
        children: elements
    };
};
const asFullColumn = (elements) => {
    return {
        tagName: "fullcolumn",
        children: elements
    };
}
// exceptions:
// fullcolumn
// rowbreak
const arrangeElements = (elements, options?: any) => {
    let innerArrange = (elements) => {
        let result = [];
        let rowIndex = 0;
        let colIndex = 0;
        let rowBuffer = [];
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
            if (each.tagName == "rowbreak") {
                pushRow();
                continue;
            }
            if (each.tagName == "fullcolumn") {
                pushRow();
                result.push(each);
                continue;
            }
            if (each.children) {
                each.children = innerArrange(each.children);
            }

            rowBuffer.push(each);
            if (colIndex == 1) {
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
export default arrangeElements;