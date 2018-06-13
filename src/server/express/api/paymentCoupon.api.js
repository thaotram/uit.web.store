import { PaymentCoupon } from '../../database/database';

/**
 *
 * @param {Express.Application} app
 * @param {Realm} realm
 */
export default function(app, realm) {
    app.get('/api/paymentCoupons', async (req, res) => {
        const paymentCoupons = await PaymentCoupon.queryPaymentCoupon(realm, req.query);
        if (!paymentCoupons) {
            res.json({ error: 'Không tìm thấy' });
            return;
        }
        res.json(paymentCoupons.map(paymentCoupon => paymentCoupon.json));
    });
}
