const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

let entryOutput = {
    entry: {
        "staticform": path.resolve(__dirname, "examples/react/staticform.tsx"),
        "reactform": path.resolve(__dirname, "examples/react/reactform/index.tsx"),
    },
    output: {
        path: path.resolve(__dirname, 'examples/js'),
        library: 'QzWebForm',
        filename: "[name].js",
    }
};
module.exports = merge(common, {
    ...entryOutput,
    mode: 'development',
    devtool: 'inline-source-map',
})