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

        io.emit('update', 'orderCoupon');
        res.send(orderCoupon.json);
    });
}
