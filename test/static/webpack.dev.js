const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

let entryOutput = [{
    entry: {
        "webform": path.resolve(__dirname, "react/index.tsx"),
    },
    output: {
        path: path.resolve(__dirname, 'js'),
        filename: "[name].js",
    }
}];
module.exports = entryOutput.map(out => merge(common, {
    ...out,
    mode: 'development',
    devtool: 'inline-source-map',
}));