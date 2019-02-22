const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: [
        'webpack-hot-middleware/client?reload=true',
        './src/index'
    ],
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(png|jpg)$/,
                exclude: /node_modules/,
                use: 'url-loader?limit=8192'
            }
        ]
    }
}