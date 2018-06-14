import { ExportBill, Employee, Cart } from '../../database/database';

/**
 *
 * @param {Express.Application} app
 * @param {Realm} realm
 */
export default function(app, realm) {
    app.post('/api/exportBill/create', async (req, res) => {
        const employee = Employee.getById(realm, Number(req.body.employeeId));
        const cart = Cart.getById(realm, Number(req.body.cartId));
        const exportBill = await ExportBill.create(
            realm,
            cart,
            employee,
        );
        res.send(exportBill.json);
    });
}
