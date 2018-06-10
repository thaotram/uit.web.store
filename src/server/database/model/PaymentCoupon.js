import { isContentValid, isMoney } from '../utils/Validation';
import { Supplier, Employee } from '../database';
import Model from '../utils/Model';

class PaymentCoupon extends Model {
    static isRawValid(paymentCoupon) {
        if (!isContentValid(paymentCoupon.content) || !isMoney(paymentCoupon.money))
            return false;
        return true;
    }

    /**
     * @param {Realm} realm
     * @param {Employee} employee
     * @param {Supplier} supplier
     * @param {PaymentCoupon} rawPaymentCoupon
     *
     */
    static async create(realm, supplier, employee, rawPaymentCoupon) {
        if (
            !Supplier.has(realm, supplier) ||
            !Employee.has(realm, employee) ||
            !PaymentCoupon.isRawValid(rawPaymentCoupon)
        ) {
            throw `Supplier, Employee or PaymentCoupon doesn't exist`;
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
