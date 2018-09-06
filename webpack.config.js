let webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    entry: __dirname + '/src/index.js',
    output: {
        path: __dirname + "/build/",
        filename: 'bundle.js'
    },
    devtool: '#eval-source-map',
    module: {
        rules: [
            {
                test: /\.less|css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                           publicPath: __dirname + "/build/css"
                        }
                    },
                    "css-loader", "less-loader"
                ]
            },
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./css/[name].css",
        }),
    ],
    devServer: {
        historyApiFallback: true
    },
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}

