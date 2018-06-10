import { ImportCoupon } from '../../database/database';

/**
 *
 * @param {Express.Application} app
 * @param {Realm} realm
 */
export default function(app, realm) {
    app.get('/api/importCoupons', (req, res) => {
        res.json(ImportCoupon.getJsons(realm));
    });
}
