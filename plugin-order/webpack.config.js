const path = require('path');
// const ZipPlugin = require('./plugins/zip-plugin');
const MyPlugin = require('./plugins/demo-plugins')
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js'
    },
    mode: 'production',
    plugins: [
        new MyPlugin('xixi')
        // new ZipPlugin({
        //     filename: 'offline'
        // })
    ]
}