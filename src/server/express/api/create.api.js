import { standardizeCreate } from './utils/utils';
import { Model, Employee } from '../../database/database';
/**
 *
 * @param {Express.Application} app
 * @param {SocketIO.Server} io
 * @param {Realm} realm
 */
export default function(app, io, realm) {
    app.post('/api/create', async (req, res) => {
        const create = standardizeCreate(req.body, req.sessionID);

        await create.model.create(create);

        io.emit('update', create._);
        create.model.notification.forEach(name => io.emit('update', name));

        res.json({ message: 'Thành công' });
    });
}
