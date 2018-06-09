import { isPaidContentValid, isMoney } from '../utils/Validation';
import { Supplier, Employee } from '../database';
import Model from '../utils/Model';

class PaymentCoupon extends Model {
    static isRawValid(paymentCoupon) {
        if (
            !isPaidContentValid(paymentCoupon.paidContent) ||
            !isMoney(paymentCoupon.money)
        )
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
                !Supplier.isValid(realm, supplier) ||
                !Employee.isValid(realm, employee) ||
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
                            paidContent: rawPaymentCoupon.paidContent,
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
