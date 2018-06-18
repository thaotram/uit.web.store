import { Cart, Employee } from '../database';
import Model from '../utils/Model';
class ExportBill extends Model {
    /**
     * @param {import('../../express/api/utils/interface').Create} create
     */
    static async create(create) {
        const employee = create.authorize.staff;

        const cart = await Cart.create(create);

        return await ExportBill.write({
            id: ExportBill.nextId,
            employee,
            cart,
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
            employeeId: this.employee ? this.employee.id : null,
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

ExportBill.permission = {
    user: [],
    employee: ['read', 'create'],
};

export default ExportBill;
