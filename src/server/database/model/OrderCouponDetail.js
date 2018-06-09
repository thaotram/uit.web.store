import Model from '../utils/Model';

class OrderCouponDetail extends Model {
    static isRawValid(cartDetail) {
        if (!Array.isArray(cartDetail)) return false;

        return cartDetail.every(detail => {
            if (typeof detail != 'object') return false;
            if (!detail.hasOwnProperty('id') || !detail.hasOwnProperty('amount')) {
                return false;
            }
            if (typeof detail.id != 'number' || typeof detail.amount != 'number') {
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
