const path = require("path");
const fs = require("fs");
const webpack = require("webpack");

module.exports = {
    entry: {
        app: `./app/browser.js`, //需要打包的文件
    },
    target: 'node',
    output: {
        path: path.resolve(__dirname+'/dist'),
        filename: '[name].js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude:/node_modules/,
                loader: 'babel-loader',
            },
        ]
    },
}
