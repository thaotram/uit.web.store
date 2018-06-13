import { ImportCoupon } from '../../database/database';

/**
 *
 * @param {Express.Application} app
 * @param {Realm} realm
 */
export default function(app, realm) {
    app.get('/api/importCoupons', async (req, res) => {
        const importCoupons = await ImportCoupon.queryImportCoupon(realm, req.query);
        if (!importCoupons) {
            res.json({ error: 'Không tìm thấy' });
            return;
        }
        res.json(importCoupons.map(importCoupon => importCoupon.json));
    });
}
