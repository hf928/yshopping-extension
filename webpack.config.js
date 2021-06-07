
const path = require('path');
const entryDir = 'src';

module.exports = {
    mode: 'development',
    entry: {
        popup: path.resolve(__dirname, entryDir + '/popup.js'),
        bg: path.resolve(__dirname, entryDir + '/bg.js'),
        get_coupons: path.resolve(__dirname, entryDir + '/get_coupons.js'),
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js'
    },
    resolve: {
        extensions: [
            '.js'
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    devtool: 'cheap-module-source-map'
};
