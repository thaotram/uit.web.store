import { standardizeCreate } from '../utils/utils';

/**
 * @param {SocketIO.Server} io
 * @param {SocketIO.Socket} client
 */
export default function(io, client) {
    client.on('api/update', async (body, res) => {
        const create = standardizeCreate(body, client.request.sessionID);

        await create.model.create(create);

        io.emit('update', create._);
        create.model.notification.forEach(name => io.emit('update', name));

        res.json({ message: 'Thành công' });
    });
}
