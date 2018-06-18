import { standardizeCreate } from '../utils/utils';

/**
 * @param {SocketIO.Server} io
 * @param {SocketIO.Socket} client
 */
export default function(io, client) {
    client.on('api/create', async (body, res) => {
        const create = standardizeCreate(body, client.request.sessionID);

        const authorize = create.authorize;
        const permission = create.model.permission;

        if (authorize.staff !== undefined) {
            if (permission.employee.indexOf('create') === -1) throw 'Không có đủ quyền';
        } else {
            if (permission.user.indexOf('create') === -1) throw 'Không có đủ quyền';
        }
        
        const object = await create.model.create(create);
        object.notification(io);

        // io.emit('update', create._);
        // create.model.notification.forEach(name => io.emit('update', name));

        res.json({ message: 'Thành công' });
    });
}
