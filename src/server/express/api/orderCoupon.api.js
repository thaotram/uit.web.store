import { OrderCoupon } from '../../database/database';

/**
 *
 * @param {Express.Application} app
 * @param {Realm} realm
 */
export default function(app, realm) {
    app.get('/api/orderCoupons', async (req, res) => {
        const orderCoupons = await OrderCoupon.queryOrderCoupon(realm, req.query);
        if (!orderCoupons) {
            res.json({ error: 'Không tìm thấy' });
            return;
        }
        res.json(orderCoupons.map(orderCoupon => orderCoupon.json));
    });
}
