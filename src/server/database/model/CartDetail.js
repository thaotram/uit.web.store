import Model from '../utils/Model';

class CartDetail extends Model {
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
