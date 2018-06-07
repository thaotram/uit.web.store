class CartDetail {
    static getNextId(realm) {
        const items = realm.objects('CartDetail');
        return items.length == 0 ? 1 : items.max('id') + 1;
    }
    static isValid(realm, cartDetail) {
        if (!cartDetail) {
            return false;
        }
        return (
            realm
                .objects('CartDetail')
                .filtered(`id == ${cartDetail.id}`)[0] !==
            undefined
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
            if(detail.amount <= 0) return false;
            return true;
        });
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
