import path from 'path';

/**
 *
 * @param {Express.Application} app
 */
export default function(app) {
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../../dist/index.html'));
    });
    app.get('*', (req, res) => {
        res.status(404).send('Not Found');
    });
}
