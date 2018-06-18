/**
 *
 * @param {Express.Application} app
 */
export default function(app) {
    app.get('*', (req, res) => {
        res.status(404).send('Not Found');
    });
}
