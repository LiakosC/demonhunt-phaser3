const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    plugins: [
        new CopyPlugin([
            {from: 'assets', to: '.'}
        ])
    ]
}