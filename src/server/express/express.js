import path from 'path';
import book from './api/book.api';
import user from './api/user.api';

/**
 *
 * @param {Express.Application} app
 * @param {Realm} realm
 */
export default function(app, realm) {
    book(app, realm);
    user(app, realm);

    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../../dist/client/index.html'));
    });
    app.get('*', (req, res) => {
        res.status(404).send('Not Found');
    });
}
