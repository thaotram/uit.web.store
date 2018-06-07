import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import VueLoaderPlugin from 'vue-loader/lib/plugin';

export default {
    cache: true,
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, '../client'),
    },
    target: 'web',
    devtool: '#source-map',
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        query: {
                            presets: ['es2015', 'stage-2'],
                        },
                    },
                    {
                        loader: 'vue-import-loader',
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'vue-style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            data: '@import "variables";',
                            includePaths: [
                                path.resolve(__dirname, '../client/style/'),
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif|svg|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                },
            },
            {
                test: /\.json$/,
                use: 'json-loader',
            },
        ],
    },
    resolve: {
        modules: [
            path.resolve(__dirname, '../../node_modules'),
            path.resolve(__dirname, '../client/style'),
            path.resolve(__dirname, '../client/script/vue/routes'),
            path.resolve(__dirname, '../client/script/vue/app'),
            path.resolve(__dirname, '../client/script/vue/unit'),
            path.resolve(__dirname, '../client/script/vue/container'),
            path.resolve(__dirname, '../client/script/modules'),
        ],
        extensions: ['.js', '.vue', '.json'],
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/client/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
            },
        }),
    ],
};
