const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './website/index.jsx',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'website/dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /(\.js|\.jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader"
                ]
            },
            {
                test: /(\.html|\.txt)$/,
                loader: 'raw-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                MODE_ENV: JSON.stringify("production")
            }
        }),
        new MiniCssExtractPlugin({
            filename: "duxtree.css"
        }),
        new OptimizeCSSAssetsPlugin({}),
        new CopyWebpackPlugin([
            {from: './website/build/index.html', flatten:true},
            {from: './website/build/styles.css', flatten:true},
            {from: './website/build/duxtree.png', flatten:true}
        ])
    ]
};
