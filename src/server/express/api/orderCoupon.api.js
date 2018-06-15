import { OrderCoupon, Supplier, Employee } from '../../database/database';

/**
 *
 * @param {Express.Application} app
 * @param {SocketIO.Server} io
 * @param {Realm} realm
 */
export default function(app, io, realm) {
    app.post('/api/orderCoupon/create', async (req, res) => {
        const employee = Employee.getBySessionId(req.sessionID);
        const supplier = Supplier.getById(realm, Number(req.body.supplierId));
        const orderCoupon = await OrderCoupon.create(
            realm,
            supplier,
            employee,
            req.body.orderCouponDetails,
        );
        res.send(orderCoupon.json);
    });

    app.get('/api/orderCoupons', async (req, res) => {
        Employee.getBySessionId(req.sessionID);

        const orderCoupons = await OrderCoupon.queryOrderCoupon(realm, req.query);
        if (!orderCoupons) {
            res.json({ error: 'Không tìm thấy' });
            return;
        }
        res.json(orderCoupons.map(orderCoupon => orderCoupon.json));
    });
}
