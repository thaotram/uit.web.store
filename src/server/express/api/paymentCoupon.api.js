import { PaymentCoupon, Supplier, Employee } from '../../database/database';

/**
 *
 * @param {Express.Application} app
 * @param {SocketIO.Server} io
 * @param {Realm} realm
 */
export default function(app, io, realm) {
    app.post('/api/paymentCoupon/create', async (req, res) => {
        const employee = Employee.getBySessionId(req.sessionID);
        const supplier = Supplier.getById(realm, Number(req.body.supplierId));
        const paymentCoupon = await PaymentCoupon.create(
            realm,
            supplier,
            employee,
            req.body.data,
        );

        io.emit('update', 'paymentCoupon');
        io.emit('update', 'supplier');
        res.send(paymentCoupon.json);
    });

    app.get('/api/paymentCoupons', async (req, res) => {
        Employee.getBySessionId(req.sessionID);

        const paymentCoupons = await PaymentCoupon.queryPaymentCoupon(realm, req.query);
        if (!paymentCoupons) {
            res.json({ error: 'Không tìm thấy' });
            return;
        }
        res.json(paymentCoupons.map(paymentCoupon => paymentCoupon.json));
    });
}
