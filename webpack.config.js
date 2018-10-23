const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: {
        operate: './app/pages/Operate'
    },
    output: {
        path: path.resolve(__dirname + '/dist'),
        chunkFilename: 'operate.bundle.js',
        filename: '[name].js'
    },
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
                loader: 'babel-loader'
            }, {
                test: /\.(css|scss)/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }, {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
}
