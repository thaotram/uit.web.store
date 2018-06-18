import { ImportCoupon, Supplier, Employee } from '../../database/database';

/**
 *
 * @param {Express.Application} app
 * @param {SocketIO.Server} io
 * @param {Realm} realm
 */
export default function(app, io, realm) {
    app.post('/api/importCoupons/create', async (req, res) => {
        const employee = Employee.getBySessionId(req.sessionID);
        const supplier = Supplier.getById(realm, Number(req.body.supplierId));

        const importCoupon = await ImportCoupon.create(
            realm,
            supplier,
            employee,
            req.body.shipper,
            req.body.importCouponDetails,
        );

        io.emit('update', 'importCoupon');
        io.emit('update', 'supplier');
        io.emit('update', 'book');
        res.send(importCoupon.json);
    });
}
