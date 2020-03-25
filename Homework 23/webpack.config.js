const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /.*\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(eot|gif|otf|png|svg|ttf|woff|woff2)$/,
                use: 'file-loader?name=fonts/[name].[ext]!static'
                // use: ['file-loader', 'ttf-loader']
            }
        ]
    }
}