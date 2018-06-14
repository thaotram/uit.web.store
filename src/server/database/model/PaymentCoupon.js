import { isContentValid, isMoney } from '../utils/Validation';
import { Supplier, Employee } from '../database';
import Model from '../utils/Model';
import moment from 'moment';

class PaymentCoupon extends Model {
    static isRawValid(paymentCoupon) {
        isContentValid(paymentCoupon.content);
        isMoney(paymentCoupon.money);
    }

    /**
     * @param {Realm} realm
     * @param {Employee} employee
     * @param {Supplier} supplier
     * @param {PaymentCoupon} rawPaymentCoupon
     *
     */
    static async create(realm, supplier, employee, rawPaymentCoupon) {
        PaymentCoupon.isRawValid(rawPaymentCoupon);
        if (!Supplier.has(realm, supplier) || !Employee.has(realm, employee)) {
            throw `Supplier, Employee doesn't exist`;
        }
        return await PaymentCoupon.write(realm, true, {
            id: PaymentCoupon.getNextId(realm),
            supplier: supplier,
            employee: employee,
            content: rawPaymentCoupon.content,
            money: rawPaymentCoupon.money,
            create: new Date(),
        });
    }

    /**
     *
     * @param {Realm} realm
     * @param {import('../interface').QueryPaymentCoupon} query
     * @return {Promise<Realm.Results<PaymentCoupon>>}
     */
    static async queryPaymentCoupon(realm, query) {
        let paymentCoupons = realm.objects('PaymentCoupon');
        if (query.hasOwnProperty('employeeId')) {
            paymentCoupons = paymentCoupons.filtered(
                'employee.id == $0',
                query.employeeId,
            );
        }
        if (query.hasOwnProperty('supplierId')) {
            paymentCoupons = paymentCoupons.filtered(
                'supplier.id == $0',
                query.supplierId,
            );
        }
        if (query.hasOwnProperty('begin')) {
            const begin = moment(query.begin, 'DD-MM-YYYY').toDate();
            paymentCoupons = paymentCoupons.filtered('create >= $0', begin);
        }
        if (query.hasOwnProperty('end')) {
            const end = moment(query.end, 'DD-MM-YYYY').toDate();
            paymentCoupons = paymentCoupons.filtered('create >= $0', end);
        }
        return paymentCoupons;
    }

    get json() {
        const o = this.object;
        o.employeeId = this.employee.id;
        o.supplierId = this.supplier.id;
        return o;
    }
}

PaymentCoupon.schema = {
    name: 'PaymentCoupon',
    primaryKey: 'id',

    properties: {
        id: 'int',
        supplier: 'Supplier',
        employee: 'Employee',
        content: 'string',
        money: 'int',
        create: 'date',
    },
};

export default PaymentCoupon;
