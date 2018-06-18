import { Cart, Employee, Book, User } from '../database';
import Model from '../utils/Model';
class ExportBill extends Model {
    /**
     * @param {import('../../socket/utils/interface').Create} create
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
        return this.object;
    }

    get detail() {
        return {
            total: this.total,
            count: this.count,
            employeeId: this.employee ? this.employee.id : null,
        };
    }

    notification(io) {
        io.emit('push', {
            name: ExportBill.schema.name,
            data: this.json,
        });
        io.emit('push', {
            name: Cart.schema.name,
            data: this.cart.json,
        });

        this.cart.cartDetails.forEach(cartDetail => {
            io.emit('update', {
                name: Book.schema.name,
                data: cartDetail.book.json,
            });
        });

        io.emit('update', {
            name: Employee.schema.name,
            data: this.employee.json,
        });

        if (this.cart.owner !== null) {
            io.emit('update', {
                name: User.schema.name,
                data: this.cart.owner.json,
            });
        }
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
