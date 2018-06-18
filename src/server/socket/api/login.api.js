import { User } from '../../database/database';

/**
 * @param {SocketIO.Server} io
 * @param {SocketIO.Socket} client
 */
export default function(io, client) {
    client.on('login', async (req, res) => {
        const user = await User.get(req, client.request.sessionID);
        if (!(user instanceof User)) return res({ error: 'Login fail' });

        const o = user.object;
        const employee = user.staff;
        if (employee !== undefined) o.employeeId = employee.id;

        io.emit('update', 'User');
        res(o);
    });
}
