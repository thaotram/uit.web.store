import { Book } from '../../database/database';

/**
 *
 * @param {Express.Application} app
 * @param {Realm} realm
 */
export default function(app, realm) {
    app.get('/api/book/:id', (req, res) => {
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
        const books = Book.getJsonBooks(realm);
        res.json(books);
    });
}
