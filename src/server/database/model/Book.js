import '@babel/polyfill';
import { Price } from '../database';
import Model from '../utils/Model';

class Book extends Model {
    /**
     *
     * @param {Realm} realm
     * @param {getRawBook} book
     */
    static async create(realm, rawBook) {
        const book = await Book.write(realm, true, rawBook.book);
        const lastPrice = book.realPrice();

        if (!lastPrice || lastPrice !== rawBook.price) {
            await Price.write(realm, true, {
                id: Price.getNextId(realm),
                time: new Date(),
                price: rawBook.price,
                book: book,
            });
        }
        return book;
    }

    /**
     * @param {Date?} time
     */
    realPriceObject(time) {
        let prices = this.prices;
        if (typeof time instanceof Date) {
            prices = prices.filtered(`time <= $0`, time);
        }
        prices = prices.sorted('time', true);
        return prices[0];
    }

    /**
     * @param {Date?} time
     */
    realPrice(time) {
        const price = this.realPriceObject(time);
        return price == null ? 0 : price.price;
    }

    static getJsonBooks(realm) {
        return realm.objects('Book').map(book => book.json);
    }

    get json() {
        const o = this.object;
        o.realPrice = this.realPrice();
        o.count = this.count;
        return o;
    }

    get count() {
        let total = 0;
        total += this.importCouponDetails.sum('count');

        total -= this.cartDetails
            .map(cartDetail => (cartDetail.isSold ? cartDetail.count : 0))
            .reduce((a, b) => a + b, 0);

        return total;
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
        orderCouponDetails: {
            type: 'linkingObjects',
            objectType: 'OrderCouponDetail',
            property: 'book',
        },
        importCouponDetails: {
            type: 'linkingObjects',
            objectType: 'ImportCouponDetail',
            property: 'book',
        },
    },
};

export default Book;
