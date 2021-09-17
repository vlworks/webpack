const path = require('path');
const miniCSS = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const localDomain = ''; // Указать domain.local для сайта на OpenServer

const optionPlugins = [
    new miniCSS({
        filename: 'style.min.css',
    }),
    new BrowserSyncPlugin(
        {
            host: 'localhost',
            port: 3000,
            ...(localDomain && {proxy: localDomain}),
            ...(!localDomain && {server: { baseDir: ['dist']}}),
        },
        {
            reload: true,
        },
    ),
];

// Без OpenServer с пустым localDomain
if (localDomain.length === 0) {
    optionPlugins.push(new HtmlWebpackPlugin({
        title: "Html Webpack Plugin",
        template: path.resolve(__dirname, './src/index.html'),
        filename: 'index.html',
    }),)
}

module.exports = {
    entry: './src/ts/scripts.ts',
    output: {
        filename: 'scripts.min.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    miniCSS.loader,
                    "css-loader",
                    "sass-loader",
                ]
            },
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: optionPlugins,
    resolve: {
      extensions: ['ts', 'js']
    },
    devtool: 'inline-source-map',           // отобразить ошибки в исходном файле, а не в выходном
};