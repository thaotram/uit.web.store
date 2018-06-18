import login from './api/login.api';
import read from './api/read.api';
/**
 * Init SocketIO in Server
 * @param {SocketIO.Server} io
 */
export default function(io) {
    io.on('connection', client => {
        const sessionID = client.request.sessionID;
        console.log(`${sessionID} in`);

        const fake = wrap(client);
        
        login(io, fake);
        read(io, fake);

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
