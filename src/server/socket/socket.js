import login from './api/login.api';
import read from './api/read.api';
import create from './api/create.api';
/**
 * Init SocketIO in Server
 * @param {SocketIO.Server} io
 */
export default function(io) {
    io.on('connection', client => {
        const fake = wrap(client);

        login(io, fake);
        read(io, fake);
        create(io, fake);

        const sessionID = fake.request.sessionID;
        console.log(`${sessionID} in`);
        client.on('disconnect', () => {
            console.log(`${sessionID} out`);
        });
    });
}

/**
 * @param {SocketIO.Socket} client
 * @returns {SocketIO.Socket}
 */
const wrap = client => ({
    request: {
        sessionID: client.request.sessionID,
    },
    on: (name, handler) =>
        client.on(name, async (req, res) => {
            try {
                await handler(req, res);
            } catch (e) {
                console.log(e);
                res({ error: String(e) });
            }
        }),
});
