import Model from '../utils/Model';
import { Book } from '../database';
class OrderCouponDetail extends Model {
    static isRawValid(realm, orderCouponDetails) {
        if (!Array.isArray(orderCouponDetails)) throw 'Danh sách chi tiết phiếu đặt phải là một mảng';

        return orderCouponDetails.every(detail => {
            if (typeof detail != 'object') throw 'Chi tiết phiếu đặt phải là kiểu đối tượng';
            if (!detail.hasOwnProperty('bookId') || !detail.hasOwnProperty('count')) {
                throw 'Không có trường dữ liệu bookId hoặc count';
            }
            if (typeof detail.bookId != 'number' || typeof detail.count != 'number') {
                throw 'Cả bookId và count phải là kiểu số';
            }
            if (Book.getById(realm, detail.bookId) == undefined) {
                throw 'BookId không tồn tại';
            }
            if (detail.count <= 0) throw 'Count phải > 0';
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
        count: 'int',
    },
};

export default OrderCouponDetail;
