import Model from '../utils/Model';

class CartDetail extends Model {
    static isRawValid(cartDetail) {
        if (!Array.isArray(cartDetail))
            throw 'Danh sách chi tiết giao dịch phải là một mảng';

        return cartDetail.every(detail => {
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
        const o = this.object;
        return o;
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
