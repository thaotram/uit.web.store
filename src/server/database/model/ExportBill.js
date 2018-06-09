import { Cart, Employee } from '../database';
import Model from '../utils/Model';
class ExportBill extends Model {
    /**
     * @param {Realm} realm
     * @param {Cart} cart
     * @param {Employee} employee
     */
    static async create(realm, cart, employee) {
        return new Promise((resolve, reject) => {
            if (!Cart.isValid(realm, cart) || !Employee.isValid(realm, employee)) {
                reject(`Cart or Employee doesn't exist`);
                return;
            }
            if (
                realm.objects('ExportBill').filtered(`cart.id == ${cart.id}`)[0] !==
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

    get total() {
        let money = 0;
        this.cart.cartDetail.forEach(detail => {
            money += detail.book.realPrice(this.create) * detail.amount;
        });
        return money;
    }
}

ExportBill.schema = {
    name: 'ExportBill',
    primaryKey: 'id',

    properties: {
        id: 'int',
        employee: 'Employee',
        cart: 'Cart',
        create: 'date',
    },
};

export default ExportBill;
