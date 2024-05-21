const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

let mode = 'development'; // По умолчанию режим development
if (process.env.NODE_ENV === 'production') { // Режим production, если
    // при запуске вебпака было указано --mode=production
    mode = 'production';
}

module.exports = {
    mode,
    entry: path.join(__dirname, "src/index.tsx"),
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "./bundle.js",
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 3000
    },
    module: {
        rules: [
            {
                test: /.css$/,
                use: "css-loader"
            },
            {
                test: /\.(ts)x?$/,
                exclude: /node_modules|\.d\.ts$/, // this line as well
                use: {
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {
                            noEmit: false, // this option will solve the issue
                        },
                    }
                }
            },
            {
                test: /\.ttf$/,
                use: [
                    {
                        loader: 'file-loader?prefix=fonts/'
                    },
                ]
            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './public/index.html'
        })
    ]
};