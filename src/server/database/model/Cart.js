import Realm from 'realm';

class Cart {
    static getNextId(realm) {
        const items = realm.objects('Cart');
        return items.length == 0 ? 1 : items.max('id') + 1;
    }
    static isValid(realm, cart) {
        if (!cart) {
            return false;
        }
        return (
            realm
                .objects('Cart')
                .filtered(`id == ${cart.id}`)[0] !==
            undefined
        );
    }
    get total() {
        let money = 0;
        this.cartDetail.forEach(detail => {
            money += detail.book.realPrice(this.create) * detail.amount;
        });
        return money;
    }
}

Cart.schema = {
    name: 'Cart',
    primaryKey: 'id',

    properties: {
        id: 'int',
        owner: 'User',
        create: 'date',

        //TODO: thêm s, đồ khó ưa
        cartDetail: {
            type: 'linkingObjects',
            objectType: 'CartDetail',
            property: 'cart',
        },
        exportBill: {
            type: 'linkingObjects',
            objectType: 'ExportBill',
            property: 'cart',
        },
    },
};

export default Cart;
