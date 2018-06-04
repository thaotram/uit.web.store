import appConfigClient from './config.client';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const sessionConfig = session({
    name: 'uit.web.store',
    secret: 'Mã bảo mật session ở máy chủ',
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: null,
    },
});

/**
 *
 * @param {Express.Application} app
 * @param {SocketIO.Server} io
 */
export default function(app, io) {
    io.use((socket, next) => {
        sessionConfig(socket.request, socket.request.res, next);
    });
    app.use(sessionConfig);
    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true,
        }),
    );
    app.use(cookieParser());
    app.set('json spaces', 2);
    appConfigClient(app);
}
