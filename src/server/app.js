import '@babel/polyfill';

import chalk from 'chalk';
import Express from 'express';
import http from 'http';
import log from 'log';
import moment from 'moment';
import SocketIO from 'socket.io';
import config from './config/config';
import Database from './database/database';
import express from './express/express';
import socket from './socket/socket';

const app = Express();
const port = process.env.PORT || 80;
const server = http.createServer(app);
const io = SocketIO(server);

(async function() {
    await Database.initialize();

    config(app, io);
    express(app);
    socket(io);

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
