/**
 *
 * @param {Express.Application} app
 * @param {Realm} realm
 */
export default function(app, realm) {
    app.get('/api/users', (req, res) => {
        const users = realm.objects('User').map(user => user.json);
        res.json(users);
    });
}
