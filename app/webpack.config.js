
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    //rules: [
    //    
    //],
    //devServer: {
    //    contentBase: path.join(__dirname, './dist'),
    //},
    plugins: [
        new CopyPlugin([
            {from: 'assets', to: '.'}
        ])
    ]
}