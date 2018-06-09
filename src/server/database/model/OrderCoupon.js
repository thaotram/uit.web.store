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
        return new Promise((resolve, reject) => {
            if (
                !Supplier.isValid(realm, supplier) ||
                !Employee.isValid(realm, employee) ||
                !OrderCouponDetail.isRawValid(orderCouponDetails)
            ) {
                reject(`Supplier, Employee or OrderCouponDetail doesn't exist`);
                return;
            }
            realm.write(() => {
                const orderCoupon = realm.create(
                    'OrderCoupon',
                    {
                        id: OrderCoupon.getNextId(realm),
                        supplier: supplier,
                        employee: employee,
                        create: new Date(),
                    },
                    true,
                );
                orderCouponDetails.forEach(orderCouponDetail => {
                    realm.create('OrderCouponDetail', {
                        id: OrderCouponDetail.getNextId(realm),
                        orderCoupon: orderCoupon,
                        book: Book.getById(realm, orderCouponDetail.id),
                        amount: orderCouponDetail.amount,
                    });
                });
                resolve(orderCoupon);
            });
        });
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

        orderDetails: {
            type: 'linkingObjects',
            objectType: 'OrderCouponDetail',
            property: 'orderCoupon',
        },
    },
};

export default OrderCoupon;
