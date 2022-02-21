const HtmlWebpackPlugin = require('html-webpack-plugin');
const { Template } = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',

    output: {
        clean: true //Limpia los archivos y cuando ejecuto el npm run buld
    },

    module:{
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/,
                exclude: /styles.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /styles.css$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader' ]

            },
            {
                test: /\.(png|jpe?g|gif)/,
                loader: 'file-loader'
            }
        ]
    },

    optimization: {},

    plugins: [
       new HtmlWebpackPlugin({
           title: 'Webpack App',
           filename: 'index.html', // Esto es opcional, porque por defecto es index.html
           template: './src/index.html'
       }),
       new MiniCssExtractPlugin({
            filename: '[name].css', // [name] para que tome el mismo nombre, [fullhash] para que cambie el nombre del archivo y así no quede en caché. para que cuando se hagan modificaciones al css cambie el nombre y obligue a la caché a actualizarse
            ignoreOrder: false
       }),
       new CopyPlugin({
        patterns: [
            { from: 'src/assets/', to: 'assets/' }
        ]
       })
    ],

}