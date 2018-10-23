const path = require("path");
// const fs = require("fs");
const webpack = require("webpack");

module.exports = {
    entry: {
        app: `./app/browser.js`, //需要打包的文件
    },
    // target: 'node',
    output: {
        path: path.resolve(__dirname+'/dist'),
        filename: '[name].js'
    },
    // devtool: 'inline-source-map',
    externals:{
        react: 'React',
		'react-dom': 'ReactDOM',
		'react-router-dom': 'ReactRouterDOM',
        "moment":"moment",
        "mobx":"mobx",
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                // exclude:/node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(css|scss)/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    },
}
