import { standardizeRead } from './utils/utils';
import { Model } from '../../database/database';
/**
 *
 * @param {Express.Application} app
 * @param {SocketIO.Server} io
 * @param {Realm} realm
 */
export default function(app, io) {
    app.post('/api/read', async (req, res) => {
        const read = standardizeRead(req.body, req.sessionID);

        let objects = read.model.list;
        if (objects.length === 0) return res.json([]);
        if (!objects[0][read.return]) {
            throw `Không tìm thấy: ${read.object}.${read.return}`;
        }

        ['=', '>', '<', '>=', '<='].forEach(operator => {
            for (const property in read[operator]) {
                objects = objects.filtered(
                    `${property} ${operator} $0`,
                    read[operator][property],
                );
            }
        });

        res.json(objects.map(o => o[read.return]));
    });
}
