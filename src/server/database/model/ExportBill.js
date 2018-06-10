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
        let money = 0;
        this.cart.cartDetail.forEach(detail => {
            money += detail.book.realPrice(this.create) * detail.amount;
        });
        return money;
    }

    get json() {
        const o = this.object;
        return o;
    }

    get jsonWithoutCart() {
        const o = this.object;
        return o;
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
