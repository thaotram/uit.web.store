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
        return new Promise((resolve, reject) => {
            if (
                !Supplier.has(realm, supplier) ||
                !Employee.has(realm, employee) ||
                !PaymentCoupon.isRawValid(rawPaymentCoupon)
            ) {
                reject(
                    `Supplier, Employee or PaymentCoupon
                 doesn't exist`,
                );
                return;
            }
            realm.write(() => {
                resolve(
                    realm.create(
                        'PaymentCoupon',
                        {
                            id: PaymentCoupon.getNextId(realm),
                            supplier: supplier,
                            employee: employee,
                            content: rawPaymentCoupon.content,
                            money: rawPaymentCoupon.money,
                            create: new Date(),
                        },
                        true,
                    ),
                );
            });
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
