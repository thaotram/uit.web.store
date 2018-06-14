import Model from '../utils/Model';
import { Book } from '../database';
class OrderCouponDetail extends Model {
    static isRawValid(realm, orderCouponDetails) {
        if (!Array.isArray(orderCouponDetails)) throw 'Danh sách chi tiết phiếu đặt phải là một mảng';

        return orderCouponDetails.every(detail => {
            if (typeof detail != 'object') throw 'Chi tiết phiếu đặt phải là kiểu đối tượng';
            if (!detail.hasOwnProperty('bookId') || !detail.hasOwnProperty('amount')) {
                throw 'Không có trường dữ liệu bookId hoặc amount';
            }
            if (typeof detail.bookId != 'number' || typeof detail.amount != 'number') {
                throw 'Cả bookId và amount phải là kiểu số';
            }
            if (Book.getById(realm, detail.bookId) == undefined) {
                throw 'BookId không tồn tại';
            }
            if (detail.amount <= 0) throw 'Amount phải > 0';
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
