import { Book, Employee, Price } from '../../database/database';
import { writeList } from '../../database/tiki';

/**
 *
 * @param {Express.Application} app
 * @param {SocketIO.Server} io
 * @param {Realm} realm
 */
export default function(app, io, realm) {
    app.get('/api/book/:id', (req, res) => {
        Employee.getBySessionId(req.sessionID);

        const id = Number(req.params.id);
        const book = Book.getById(realm, id);
        if (!book) {
            res.json({
                error: `Không tìm thấy sách có Id: ${id}`,
            });
            return;
        }
        res.json(book.json);
    });

    app.get('/api/books', (req, res) => {
        Employee.getBySessionId(req.sessionID);

        const books = Book.getJsonBooks(realm);
        res.json(books);
    });

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
