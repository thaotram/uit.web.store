import log from 'log';
import http from 'http';
import chalk from 'chalk';
import moment from 'moment';
import express from 'express';
import SocketIO from 'socket.io';
import AppConfig from './config/config';
import AppExpress from './express/express';
import AppSocket from './socket/socket';

const app = express();
const port = process.env.PORT || 80;
const server = http.createServer(app);
const io = SocketIO(server);

AppConfig(app, io);
AppExpress(app);
AppSocket(io);
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
