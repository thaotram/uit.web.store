import Realm from 'realm';

class Price {
    static getNextId(realm) {
        const items = realm.objects('Price');
        return items.length == 0 ? 1 : items.max('id') + 1;
    }
    static isValid(realm, price) {
        if (!price) {
            return false;
        }
        return (
            realm
                .objects('Price')
                .filtered(`id == ${price.id}`)[0] !==
            undefined
        );
    }
}

Price.schema = {
    name: 'Price',
    primaryKey: 'id',

    properties: {
        id: 'int',
        price: 'int',
        time: 'date',

        book: 'Book',
    },
};

export default Price;
