/**
 * Created by kirsanov on 23.03.2018.
 */

const webpack = require('webpack')
const MinifyPlugin = require("babel-minify-webpack-plugin");

const mode = process.env.NODE_ENV && process.env.NODE_ENV.replace(/[^A-Z]/ig, '') || 'development'

const Config = require('pbr-lib-front-utils/dist/config').default
let appConf = new Config('./config/', mode);

const plugins = [
    new webpack.DefinePlugin({
        'process.env': appConf.setMode(mode).exportForWebpackPlugin()
    }),
    new MinifyPlugin()
];

module.exports = {
    entry: [
        'babel-polyfill',
        './src/server.js'
    ],

    plugins,
    resolve: {
        extensions: ['.json', '.js', '.jsx']
    },
    output: {
        filename: 'app.js'
    },
    module: {
        loaders: [
            {test: /\.jsx?$/, loader: 'babel-loader', exclude: [/node_modules/]},
            {test: /\.css$/, loader: 'ignore-loader'},
            {test: /\.styl$/, loader: 'ignore-loader'},
            {test: /\.json$/, loader: 'json-loader'}
        ]
    },
    target: 'node',
    externals: [/node_modules/]
};