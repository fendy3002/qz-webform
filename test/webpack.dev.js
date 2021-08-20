const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

let entryOutput = [{
    entry: {
        "staticform": path.resolve(__dirname, "staticform/react/index.tsx"),
    },
    output: {
        path: path.resolve(__dirname, 'staticform/js'),
        filename: "[name].js",
    }
}, {
    entry: {
        "reactform": path.resolve(__dirname, "reactform/react/index.tsx"),
    },
    output: {
        path: path.resolve(__dirname, 'reactform/js'),
        filename: "[name].js",
    }
}];
module.exports = entryOutput.map(out => merge(common, {
    ...out,
    mode: 'development',
    devtool: 'inline-source-map',
}));