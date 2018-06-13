import { User } from '../database/database';
/**
 * Init SocketIO in Server
 * @param {SocketIO.Server} io
 * @param {Realm} realm
 */
export default function(io, realm) {
    io.on('connection', client => {
        const sessionID = client.request.sessionID;
        // const socketID = client.id;
        console.log(`${sessionID} in`);

        client.on('login', async (req, res) => {
            const user = await User.get(realm, req, sessionID);
            if (user instanceof User) res(true);
            res({ error: 'Login fail' });
        });

        client.on('disconnect', () => {
            console.log(`${sessionID} out`);
        });
    });
}
