import { Book, Employee, Price } from '../../database/database';
import { writeList } from '../../database/tiki';

/**
 *
 * @param {Express.Application} app
 * @param {SocketIO.Server} io
 * @param {Realm} realm
 */
export default function(app, io, realm) {
    app.post('/api/books/tiki', (req, res) => {
        Employee.getBySessionId(req.sessionID);

        res.json({
            log: 'Đang lấy thông tin sách dựa trên đường dẫn',
        });
        writeList(realm, req.body.url, io);
    });

    app.post('/api/books/price/create', async (req, res) => {
        Employee.getBySessionId(req.sessionID);

        await Price.create(realm, req.body);
        res.json({ log: 'Đã cập nhật giá' });
        io.emit('update', 'book');
    });
}
