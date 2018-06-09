import { Price } from '../database';
import Model from '../utils/Model';

class Book extends Model {
    /**
     *
     * @param {Realm} realm
     * @param {getRawBook} book
     */
    static async create(realm, rawBook) {
        return new Promise(resolve => {
            realm.write(() => {
                const book = realm.create('Book', rawBook.book, true);
                const lastPrice = realm
                    .objects('Price')
                    .filtered(`book.id == ${book.id} SORT (time DESCENDING)`)[0];
                if (!lastPrice || lastPrice.price !== rawBook.price) {
                    realm.create('Price', {
                        id: Price.getNextId(realm),
                        time: new Date(),
                        price: rawBook.price,
                        book: book,
                    });
                }
                resolve(book);
            });
        });
    }

    /**
     * @param {Date} time
     */
    realPrice(time) {
        return this.price.filtered(`time <= $0`, time).sorted('time', true)[0].price;
    }

    static getJsonBooks(realm) {
        return realm.objects('Book').map(book => book.json);
    }

    get json() {
        const o = this.object;
        o.realPrice = this.realPrice(new Date());
        return o;
    }
}

Book.schema = {
    name: 'Book',
    primaryKey: 'id',

    properties: {
        id: 'int',
        name: 'string',
        author: 'string',
        sku: 'string',
        coverPrice: 'int', //giá bìa

        publisher: 'string',
        manufacturer: 'string',
        dimensions: 'string',
        numberOfPage: 'int',
        publicationDate: 'date',
        bookCover: 'string', //bìa mềm

        description: 'string',
        image: 'string',

        categories: 'Category[]',

        prices: {
            type: 'linkingObjects',
            objectType: 'Price',
            property: 'book',
        },
        cartDetails: {
            type: 'linkingObjects',
            objectType: 'CartDetail',
            property: 'book',
        },
        orderDetails: {
            type: 'linkingObjects',
            objectType: 'OrderCouponDetail',
            property: 'book',
        },
        importDetails: {
            type: 'linkingObjects',
            objectType: 'ImportCouponDetail',
            property: 'book',
        },
    },
};

export default Book;
