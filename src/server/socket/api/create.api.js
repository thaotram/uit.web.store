import { standardizeCreate } from '../../express/api/utils/utils';

/**
 * @param {SocketIO.Server} io
 * @param {SocketIO.Socket} client
 */
export default function(io, client) {
    client.on('api/create', async (body, res) => {
        const create = standardizeCreate(req);

        await create.model.create(create);

        io.emit('update', create._);
        create.model.notification.forEach(name => io.emit('update', name));

        res.json({ message: 'Thành công' });
    });
}
