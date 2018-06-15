import { Cart, Employee } from '../database';
import Model from '../utils/Model';
class ExportBill extends Model {
    /**
     * @param {Realm} realm
     * @param {Cart} cart
     * @param {Employee} employee
     */
    static async create(realm, cart, employee) {
        if (!Cart.has(realm, cart)) throw 'Giỏ hàng không tồn tại';
        if (!Employee.has(realm, employee)) throw 'Nhân viên không tồn tại';
        if (cart.exportBill[0] !== undefined) throw 'Hóa đơn xuất đã tồn tại';

        return await ExportBill.write(realm, true, {
            id: ExportBill.getNextId(realm),
            employee: employee,
            cart: cart,
            create: new Date(),
        });
    }

    get total() {
        return this.cart.cartDetails
            .map(detail => detail.book.realPrice(this.create) * detail.count)
            .reduce((a, b) => a + b, 0);
    }

    get count() {
        return this.cart.cartDetails.sum('count');
    }

    get json() {
        const o = this.object;
        return o;
    }

    get detail() {
        return {
            total: this.total,
            count: this.count,
        };
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
