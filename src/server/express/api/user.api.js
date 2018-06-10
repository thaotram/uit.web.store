import { User } from '../../database/database';

/**
 *
 * @param {Express.Application} app
 * @param {Realm} realm
 */
export default function(app, realm) {
    app.get('/api/123/', (req, res) => {
        const user = realm.objects('User')[0];

        res.json(user.cartsJson);
    });
}
