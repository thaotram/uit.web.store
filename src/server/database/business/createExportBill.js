import Realm from 'realm';
import Cart from '../model/Cart';
import Employee from '../model/Employee';
import ExportBill from '../model/ExportBill';

/**
 *
 * @param {Realm} realm
 * @param {Cart} cart
 * @param {Employee} employee
 */
export default async function(realm, cart, employee) {
    return new Promise((resolve, reject) => {
        if (
            !Cart.isValid(realm, cart) ||
            !Employee.isValid(realm, employee)
        ) {
            reject(`Cart or Employee doesn't exist`);
            return;
        }
        if (
            realm
                .objects('ExportBill')
                .filtered(`cart.id == ${cart.id}`)[0] !==
            undefined
        ) {
            reject(`ExportBill is exist`);
            return;
        }
        realm.write(() => {
            resolve(
                realm.create(
                    'ExportBill',
                    {
                        id: ExportBill.getNextId(realm),
                        employee: employee,
                        cart: cart,
                        create: new Date(),
                    },
                    true,
                ),
            );
        });
    });
}
