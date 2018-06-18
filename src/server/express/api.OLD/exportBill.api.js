import { ExportBill, Employee, Cart, User } from '../../database/database';

/**
 *
 * @param {Express.Application} app
 * @param {SocketIO.Server} io
 * @param {Realm} realm
 */
export default function(app, io, realm) {
    app.post('/api/exportBill/create', async (req, res) => {
        const employee = Employee.getBySessionId(req.sessionID);
        const cart = Cart.getById(realm, Number(req.body.cartId));
        const exportBill = await ExportBill.create(realm, cart, employee);

        res.send(exportBill.json);
    });

    app.post('/api/exportBill/createWithContent', async (req, res) => {
        const employee = Employee.getBySessionId(req.sessionID);
        const user =
            typeof req.body.userId == 'number'
                ? User.getById(realm, Number(req.body.userId))
                : undefined;
        const cart = await Cart.create(realm, user, req.body.cartDetails);
        const exportBill = await ExportBill.create(realm, cart, employee);

        io.emit('update', 'cart');
        io.emit('update', 'book');
        res.send(exportBill.json);
    });
}
