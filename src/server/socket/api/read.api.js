import { standardizeRead } from '../utils/utils';

/**
 * @param {SocketIO.Server} io
 * @param {SocketIO.Socket} client
 */
export default function(io, client) {
    client.on('api/read', async (body, res) => {
        const read = standardizeRead(body, client.request.sessionID);

        let objects = read.model.list;
        if (objects.length === 0) return res([]);
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

        res(objects.map(o => o[read.return]));
    });
}
