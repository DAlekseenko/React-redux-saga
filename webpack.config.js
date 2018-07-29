global.Promise = require('bluebird')

const mode = process.env.NODE_ENV && process.env.NODE_ENV.replace(/[^A-Z]/ig, '') || 'development'
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const Config = require('pbr-lib-front-utils/dist/config').default

const publicPath = mode === 'production' ? '/assets/' : 'http://localhost:8050/public/assets/'
const cssName = mode === 'production' ? 'styles-[hash].css' : 'styles.css'
const jsName = mode === 'production' ? 'bundle-[hash].js' : 'bundle.js'

let appConf = new Config('./config/', mode);

const plugins = [
    new webpack.DefinePlugin({
        'process.env': appConf.setMode(mode).exportForWebpackPlugin()
    }),
    new ExtractTextPlugin(cssName),
    new webpack.LoaderOptionsPlugin({
        debug: true
    }),
    new ManifestPlugin({
        fileName: 'manifest.json'
    })
];
if (mode === 'production') {
    plugins.push(
        new CleanWebpackPlugin(['public/assets/'], {
            root: __dirname,
            verbose: true,
            dry: false
        })
    );
    plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
}

module.exports = {
    entry: ['babel-polyfill', './src/client.js'],
    resolve: {
        modules: ['node_modules'],
        extensions: ['.json', '.js', '.jsx','.styl']
    },
    plugins,
    output: {
        path: `${__dirname}/public/assets/`,
        filename: jsName,
        publicPath
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!stylus-loader?paths=node_modules/bootstrap-stylus/stylus/"
                })
            },
            {
                test: /\.(otf|eot|svg|ttf|woff|woff2|jpe?g|png|gif|ico|svg+xml)$/i,
                loader: "file-loader"
            },
            {test: /\.jsx?$/, loader: 'babel-loader', exclude: [/node_modules/, /public/]},
            {test: /\.json$/, loader: 'json-loader'},
        ]
    },
    devtool: mode !== 'production' ? 'source-map' : false,
    devServer: {
        headers: {'Access-Control-Allow-Origin': '*'}
    }
};
