const path = require("path");
const fs = require("fs");
const webpack = require("webpack");

module.exports = {
    entry: {
        css: './scss.js'
    },
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: '[name].js',
        publicPath:'./dist/'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(css|scss)/,
                // exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }, {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    }
}
