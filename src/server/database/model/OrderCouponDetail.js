import { Book } from '../database';
import Model from '../utils/Model';

class OrderCouponDetail extends Model {
    static isRawValid(orderCouponDetails) {
        if (!Array.isArray(orderCouponDetails))
            throw 'Danh sách chi tiết phiếu đặt phải là một mảng';
        if (orderCouponDetails.length === 0) {
            throw 'Phiếu đặt hàng phải có ít nhất một mặt hàng';
        }
        return orderCouponDetails.every(detail => {
            if (typeof detail != 'object')
                throw 'Chi tiết phiếu đặt phải là kiểu đối tượng';
            if (!detail.hasOwnProperty('bookId') || !detail.hasOwnProperty('count')) {
                throw 'Không có trường dữ liệu bookId hoặc count';
            }
            if (typeof detail.bookId != 'number' || typeof detail.count != 'number') {
                throw 'Cả bookId và count phải là kiểu số';
            }
            if (Book.getById(detail.bookId) == undefined) {
                throw 'BookId không tồn tại';
            }
            if (detail.count <= 0) throw 'Count phải > 0';
        });
    }

    get json() {
        return {
            ...this.object,
            bookId: this.book.id,
        };
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

OrderCouponDetail.permission = {
    user: [],
    employee: [],
};

export default OrderCouponDetail;
