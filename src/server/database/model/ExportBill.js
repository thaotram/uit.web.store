import Realm from 'realm';

class ExportBill {
    static getNextId(realm) {
        const items = realm.objects('ExportBill');
        return items.length == 0 ? 1 : items.max('id') + 1;
    }
    static isValid(realm, exportBill) {
        if (!exportBill) {
            return false;
        }
        return (
            realm
                .objects('ExportBill')
                .filtered(`id == ${exportBill.id}`)[0] !==
            undefined
        );
    }
    get total() {
        let money = 0;
        this.cart.cartDetail.forEach(detail => {
            money +=
                detail.book.realPrice(this.create) *
                detail.amount;
        });
        return money;
    }
}

ExportBill.schema = {
    name: 'ExportBill',
    primaryKey: 'id',

    properties: {
        id: 'int',
        employee: 'Employee',
        cart: 'Cart',
        create: 'date',
    },
};

export default ExportBill;
