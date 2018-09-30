const path = require("path");
// const webpack = require("webpack");

module.exports = {
    entry: {
        operate: './app/pages/Operate'
    },
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: '[name].js'
    },
    // devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                // exclude:/node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.(css|scss)/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }, {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
            }
        ]
    }
}
