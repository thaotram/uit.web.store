import Realm from 'realm';

class OrderCouponDetail {
    static getNextId(realm) {
        const items = realm.objects('OrderCouponDetail');
        return items.length == 0 ? 1 : items.max('id') + 1;
    }
    static isValid(realm, orderCouponDetail) {
        if (!orderCouponDetail) {
            return false;
        }
        return (
            realm
                .objects('OrderCouponDetail')
                .filtered(
                    `id == ${orderCouponDetail.id}`,
                )[0] !== undefined
        );
    }
    static isRawValid(cartDetail) {
        if (!Array.isArray(cartDetail)) return false;

        return cartDetail.every(detail => {
            if (typeof detail != 'object') return false;
            if (
                !detail.hasOwnProperty('id') ||
                !detail.hasOwnProperty('amount')
            ) {
                return false;
            }
            if (
                typeof detail.id != 'number' ||
                typeof detail.amount != 'number'
            ) {
                return false;
            }
            if (detail.amount <= 0) return false;
            return true;
        });
    }
}

OrderCouponDetail.schema = {
    name: 'OrderCouponDetail',
    primaryKey: 'id',

    properties: {
        id: 'int',
        orderCoupon: 'OrderCoupon',
        book: 'Book',
        amount: 'int',
    },
};

export default OrderCouponDetail;
