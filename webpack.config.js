var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");


module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'), 
        filename: 'app.bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Project title here',
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            template: './src/index.ejs'
        })
    ]
}