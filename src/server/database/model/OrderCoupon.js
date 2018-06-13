import Promise from 'bluebird';
import { Book, Employee, OrderCouponDetail, Supplier } from '../database';
import Model from '../utils/Model';
import moment from 'moment';

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

    /**
     *
     * @param {Realm} realm
     * @param {import('../interface').QueryCart} query
     * @return {Promise<Realm.Results<OrderCoupon>>}
     */
    static async queryOrderCoupon(realm, query) {
        let orderCoupons = realm.objects('OrderCoupon');
        if (query.hasOwnProperty('employeeId')) {
            orderCoupons = orderCoupons.filtered('employee.id == $0', query.employeeId);
        }
        if (query.hasOwnProperty('supplierId')) {
            orderCoupons = orderCoupons.filtered('supplier.id == $0', query.supplierId);
        }
        if (query.hasOwnProperty('begin')) {
            const begin = moment(query.begin, 'DD-MM-YYYY');
            orderCoupons = orderCoupons.filtered('create >= $0', begin);
        }
        if (query.hasOwnProperty('end')) {
            const end = moment(query.end, 'DD-MM-YYYY');
            orderCoupons = orderCoupons.filtered('create >= $0', end);
        }
        return orderCoupons;
    }

    get json() {
        const o = this.object;
        o.supplierId = this.supplier.id;
        o.employeeId = this.employee.id;
        o.orderCouponDetails = this.orderCouponDetails.map(
            orderCouponDetail => orderCouponDetail.json,
        );
        return o;
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
