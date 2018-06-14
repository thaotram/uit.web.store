import { ExportBill, Employee, Cart, User } from '../../database/database';

/**
 *
 * @param {Express.Application} app
 * @param {Realm} realm
 */
export default function(app, realm) {
    app.post('/api/exportBill/create', async (req, res) => {
        const employee = Employee.getById(realm, Number(req.body.employeeId));
        const cart = Cart.getById(realm, Number(req.body.cartId));
        const exportBill = await ExportBill.create(realm, cart, employee);
        res.send(exportBill.json);
    });

    app.post('/api/exportBill/createWithContent', async (req, res) => {
        const employee = Employee.getById(realm, Number(req.body.employeeId));
        const user =
            typeof req.body.userId == 'number'
                ? User.getById(realm, Number(req.body.userId))
                : undefined;
        const cart = await Cart.create(realm, user, req.body.cartDetails);
        const exportBill = await ExportBill.create(realm, cart, employee);
        res.send(exportBill.json);
    });
}
