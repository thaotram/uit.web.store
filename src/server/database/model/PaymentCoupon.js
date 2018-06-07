import Realm from 'realm';
import {
    isPaidContentValid,
    isMoney,
} from '../business/Utils';

class PaymentCoupon {
    static getNextId(realm) {
        const items = realm.objects('PaymentCoupon');
        return items.length == 0 ? 1 : items.max('id') + 1;
    }
    static isValid(realm, paymentCoupon) {
        if (!paymentCoupon) {
            return false;
        }
        return (
            realm
                .objects('PaymentCoupon')
                .filtered(
                    `id == ${paymentCoupon.id}`,
                )[0] !== undefined
        );
    }
    static isRawValid(paymentCoupon) {
        if (
            !isPaidContentValid(
                paymentCoupon.paidContent,
            ) ||
            !isMoney(paymentCoupon.money)
        )
            return false;
        return true;
    }
}

PaymentCoupon.schema = {
    name: 'PaymentCoupon',
    primaryKey: 'id',

    properties: {
        id: 'int',
        supplier: 'Supplier',
        employee: 'Employee',
        paidContent: 'string',
        money: 'int',
        create: 'date',
    },
};

export default PaymentCoupon;
