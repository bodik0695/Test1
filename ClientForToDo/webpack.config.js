const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/app.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                }),
            },
        ],
        loaders: [
            {
                test: /\.handlebars$/,
                loader: `${__dirname}/../../?helperDirs[]=${__dirname}/helpers`,
            },
        ],
    },
    devServer: {
        hot: true,
        inline: true,
        port: 4000,
        proxy: {
            '/todos': {
                target: 'http://localhost:3000',
                secure: false,
            },
        },
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
};
