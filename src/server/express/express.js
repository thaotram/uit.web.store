import path from 'path';
import book from './api/book.api';
/**
 *
 * @param {Express.Application} app
 */
export default function(app) {
    const realm = app.realm;
    
    book(app);

    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../../dist/client/index.html'));
    });
    app.get('*', (req, res) => {
        res.status(404).send('Not Found');
    });
}
