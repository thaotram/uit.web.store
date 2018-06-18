import { standardizeUpdate } from '../utils/utils';

/**
 * @param {SocketIO.Server} io
 * @param {SocketIO.Socket} client
 */
export default function(io, client) {
    client.on('api/update', async (body, res) => {
        const update = standardizeUpdate(body, client.request.sessionID);

        const authorize = update.authorize;
        const permission = update.model.permission;

        if (authorize.staff !== undefined) {
            if (permission.employee.indexOf('update') === -1) throw 'Không có đủ quyền';
        } else {
            if (permission.user.indexOf('update') === -1) throw 'Không có đủ quyền';
        }

        await update.model.create(update);

        io.emit('update', update._);
        update.model.notification.forEach(name => io.emit('update', name));

        res.json({ message: 'Thành công' });
    });
}
