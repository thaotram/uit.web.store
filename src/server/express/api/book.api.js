import Book from '../../database/model/Book';

export default function(app) {
    const realm = app.realm;
    
    app.get('/api/book/:id', (req, res) => {
        const id = req.params.id;
        const book = Book.getBookById(realm, id);
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
