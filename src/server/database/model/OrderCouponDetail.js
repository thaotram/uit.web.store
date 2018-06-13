import Model from '../utils/Model';
import { Book } from '../database';
class OrderCouponDetail extends Model {
    static isRawValid(realm, orderCouponDetails) {
        if (!Array.isArray(orderCouponDetails)) return false;

        return orderCouponDetails.every(detail => {
            if (typeof detail != 'object') return false;
            if (!detail.hasOwnProperty('bookId') || !detail.hasOwnProperty('amount')) {
                return false;
            }
            if (typeof detail.bookId != 'number' || typeof detail.amount != 'number') {
                return false;
            }
            if (Book.getById(realm, detail.bookId) == undefined) {
                return false;
            }
            if (detail.amount <= 0) return false;
            return true;
        });
    }

    get json(){
        const o = this.object;
        o.bookId = this.book.id;
        return o;
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
