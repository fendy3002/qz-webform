const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

let entryOutput = {
    entry: {
        "qz_webform": path.resolve(__dirname, "examples/react/index.tsx"),
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