import Model from '../utils/Model';

class CartDetail extends Model {
    static isRawValid(cartDetails) {
        if (!Array.isArray(cartDetails)) {
            throw 'Danh sách chi tiết giao dịch phải là một mảng';
        }
        if (cartDetails.length === 0) {
            throw 'Hóa đơn phải có ít nhất một chi tiết';
        }
        return cartDetails.every(detail => {
            if (typeof detail != 'object')
                throw 'Chi tiết giao dịch phải là kiểu đối tượng';
            if (!detail.hasOwnProperty('bookId') || !detail.hasOwnProperty('count')) {
                throw 'Không có trường dữ liệu id hoặc count';
            }
            if (typeof detail.bookId != 'number' || typeof detail.count != 'number') {
                throw 'Cả id và count phải là kiểu số';
            }
            if (detail.count <= 0) throw 'Count phải > 0';
        });
    }

    get isSold() {
        if (this.cart == null) return false;
        return this.cart.isSold;
    }

    get json() {
        return {
            ...this.object,
            bookId: this.book.id,
            price: this.book.realPrice(this.cart.create),
        };
    }
}

CartDetail.schema = {
    name: 'CartDetail',
    primaryKey: 'id',

    properties: {
        id: 'int',
        cart: 'Cart',
        book: 'Book',
        count: 'int',
    },
};

CartDetail.permission = {
    user: [],
    employee: [],
};

export default CartDetail;
