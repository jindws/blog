const path = require("path");
const webpack = require("webpack");
const externals = require('./externals')

module.exports = {
    entry: {
        index:[
            '@babel/polyfill',
            './src/server.js'
        ],
    },
    output: {
        path: path.resolve(__dirname+'/dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: [".js"]
    },
    target: 'node',
    externals,
    context: __dirname,
    target: 'node',
    node: {
        console: true,
        global: true,
        process: true,
        Buffer: true,
        __filename: true,
        __dirname: true,
        setImmediate: true,
        path: true
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env',"@babel/preset-react"]
                }
            }
        ]
    },
}
