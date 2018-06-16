import book from './api/book.api';
import user from './api/user.api';
import cart from './api/cart.api';
import importCoupon from './api/importCoupon.api';
import orderCoupon from './api/orderCoupon.api';
import paymentCoupon from './api/paymentCoupon.api';
import supplier from './api/supplier.api';
import employee from './api/employee.api';
import exportBill from './api/exportBill.api';

/**
 *
 * @param {Express.Application} app
 * @param {SocketIO.Server} io
 * @param {Realm} realm
 */
export default function(app, io, realm) {
    book(app, io, realm);
    user(app, io, realm);
    cart(app, io, realm);
    importCoupon(app, io, realm);
    orderCoupon(app, io, realm);
    paymentCoupon(app, io, realm);
    supplier(app, io, realm);
    employee(app, io, realm);
    exportBill(app, io, realm);

    app.get('*', (req, res) => {
        res.status(404).send('Not Found');
    });
}
