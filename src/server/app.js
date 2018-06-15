import '@babel/polyfill';

import chalk from 'chalk';
import Express from 'express';
import http from 'http';
import log from 'log';
import moment from 'moment';
import SocketIO from 'socket.io';
import config from './config/config';
import database from './database/database';
import express from './express/express';
import socket from './socket/socket';

const app = Express();
const port = process.env.PORT || 80;
const server = http.createServer(app);
const io = SocketIO(server);

(async function() {
    const realm = await database();

    config(app, io);
    express(wrap(app), realm);
    socket(io, realm);

    server.listen(port, () => {
        log(
            {
                Environment: process.env.NODE_ENV || 'Unknown Environment',
                Url: `http://127.0.0.1:${port}`,
                Time: `${moment().format('hh:mm:ss')}`,
            },
            {
                title: 'App.js',
                color: chalk.blue,
                length: 55,
            },
        );
    });
})();

/**
 * @param {Express.Application} app
 * @returns {Express.Application}
 */
function wrap(app) {
    const _ = handler => async (req, res) => {
        try {
            await handler(req, res);
        } catch (e) {
            res.status(400).json({ error: String(e) });
        }
    };
    return {
        get: (name, handler) => app.get(name, _(handler)),
        post: (name, handler) => app.post(name, _(handler)),
    };
}
