import Model from '../utils/Model';

class CartDetail extends Model {
    static isRawValid(cartDetail) {
        if (!Array.isArray(cartDetail)) throw 'Danh sách chi tiết giao dịch phải là một mảng';

        return cartDetail.every(detail => {
            if (typeof detail != 'object') throw 'Chi tiết giao dịch phải là kiểu đối tượng';
            if (!detail.hasOwnProperty('id') || !detail.hasOwnProperty('amount')) {
                throw 'Không có trường dữ liệu id hoặc amount';
            }
            if (typeof detail.id != 'number' || typeof detail.amount != 'number') {
                throw 'Cả id và amount phải là kiểu số';
            }
            if (detail.amount <= 0) throw 'Amount phải > 0';
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
        amount: 'int',
    },
};

export default CartDetail;
