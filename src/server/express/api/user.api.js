import { Employee } from '../../database/database';

/**
 *
 * @param {Express.Application} app
 * @param {SocketIO.Server} io
 * @param {Realm} realm
 */
export default function(app, io, realm) {
    app.get('/api/users', (req, res) => {
        Employee.getBySessionId(req.sessionID);

        const users = realm.objects('User').map(user => ({
            ...user.json,
            ...user.detail,
        }));
        res.json(users);
    });
}
