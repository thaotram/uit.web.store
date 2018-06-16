import { User } from '../database/database';
/**
 * Init SocketIO in Server
 * @param {SocketIO.Server} io
 * @param {Realm} realm
 */
export default function(io, realm) {
    io.on('connection', client => {
        const sessionID = client.request.sessionID;
        console.log(`${sessionID} in`);

        client.on('login', async (req, res) => {
            const user = await User.get(realm, req, sessionID);

            if (!(user instanceof User)) return res({ error: 'Login fail' });

            const o = user.json;
            const employee = user.employee[0];
            if (employee !== undefined) o.employeeId = employee.id;

            io.emit('update', 'user');
            res(o);
        });

        client.on('disconnect', () => {
            console.log(`${sessionID} out`);
        });
    });
}
