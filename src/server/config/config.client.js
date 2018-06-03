import express from 'express';
import path from 'path';

/**
 *
 * @param {Express.Application} app
 */
export default function(app) {
    app.use(express.static(path.resolve(__dirname, '../../../public')));

    if (process.env.NODE_ENV === 'development') {
        const webpack = require('webpack');
        const openInEditor = require('launch-editor-middleware');
        const webpackDev = require('../../webpack/webpack.dev');
        const webpackDevMiddleware = require('webpack-dev-middleware');
        const webpackHotMiddleware = require('webpack-hot-middleware');
        const webpackCompiler = webpack(webpackDev.default);

        const config = {
            stats: {
                hash: false,
                version: false,
                assets: false,
                modules: false,
                colors: true,
            },
            before(app) {
                app.use('/__open-in-editor', openInEditor());
            },
        };
        app.use(webpackDevMiddleware(webpackCompiler, config));
        app.use(webpackHotMiddleware(webpackCompiler));
    } else {
        app.use(
            express.static(path.resolve(__dirname, '../../../dist/client')),
        );
    }
}
