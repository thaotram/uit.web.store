import { PaymentCoupon, Supplier, Employee } from '../../database/database';

/**
 *
 * @param {Express.Application} app
 * @param {Realm} realm
 */
export default function(app, realm) {
    app.post('/api/payment_coupon/create', async (req, res) => {
        const employee = Employee.getById(realm, Number(req.body.employeeId));
        const supplier = Supplier.getById(realm, Number(req.body.supplierId));
        const paymentCoupon = await PaymentCoupon.create(
            realm,
            supplier,
            employee,
            req.body.rawPaymentCoupon,
        );
        res.send(paymentCoupon.json);
    });

    app.get('/api/payment_coupons', async (req, res) => {
        const paymentCoupons = await PaymentCoupon.queryPaymentCoupon(realm, req.query);
        if (!paymentCoupons) {
            res.json({ error: 'Không tìm thấy' });
            return;
        }
        res.json(paymentCoupons.map(paymentCoupon => paymentCoupon.json));
    });
}
