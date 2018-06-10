import Promise from 'bluebird';
import { Book, Employee, OrderCouponDetail, Supplier } from '../database';
import Model from '../utils/Model';

class OrderCoupon extends Model {
    /**
     * const orderCouponDetails = [
     *     { id: 1517213, amount: 1 },
     *     { id: 1517213, amount: 1 },
     * ];
     * @param {Realm} realm
     * @param {Employee} employee
     * @param {Supplier} supplier
     * @param {Object[]} orderCouponDetails
     */
    static async create(realm, supplier, employee, orderCouponDetails) {
        if (
            !Supplier.has(realm, supplier) ||
            !Employee.has(realm, employee) ||
            !OrderCouponDetail.isRawValid(realm, orderCouponDetails)
        ) {
            throw `Supplier, Employee or OrderCouponDetail doesn't exist`;
        }
        const orderCoupon = await OrderCoupon.write(realm, true, {
            id: OrderCoupon.getNextId(realm),
            supplier: supplier,
            employee: employee,
            create: new Date(),
        });
        await Promise.map(orderCouponDetails, orderCouponDetail => {
            OrderCouponDetail.write(realm, false, {
                id: OrderCouponDetail.getNextId(realm),
                orderCoupon: orderCoupon,
                book: Book.getById(realm, orderCouponDetail.bookId),
                amount: orderCouponDetail.amount,
            });
        });
        return orderCoupon;
    }
}

OrderCoupon.schema = {
    name: 'OrderCoupon',
    primaryKey: 'id',

    properties: {
        id: 'int',
        supplier: 'Supplier',
        employee: 'Employee',
        create: 'date',

        orderCouponDetails: {
            type: 'linkingObjects',
            objectType: 'OrderCouponDetail',
            property: 'orderCoupon',
        },
    },
};

export default OrderCoupon;
