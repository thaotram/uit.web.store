import Realm from 'realm';
import PaymentCoupon from '../model/PaymentCoupon';
import Employee from '../model/Employee';
import Supplier from '../model/Supplier';

/**
 * @param {Realm} realm
 * @param {Employee} employee
 * @param {Supplier} supplier
 * @param {PaymentCoupon} rawPaymentCoupon
 *
 */
export default async function(
    realm,
    supplier,
    employee,
    rawPaymentCoupon,
) {
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
                        paidContent:
                            rawPaymentCoupon.paidContent,
                        money: rawPaymentCoupon.money,
                        create: new Date(),
                    },
                    true,
                ),
            );
        });
    });
}
