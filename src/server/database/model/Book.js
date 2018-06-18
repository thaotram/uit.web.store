import '@babel/polyfill';
import { db, Price } from '../database';
import Model from '../utils/Model';

class Book extends Model {
    /**
     * @param {Object} rawbook
     */
    static async create(rawBook) {
        const book = await Book.write(rawBook.book);
        const lastPrice = book.realPrice();

        if (!lastPrice || lastPrice !== rawBook.price) {
            await Price.write({
                id: Price.nextId,
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

    static getJsonBooks() {
        return db.realm.objects('Book').map(book => book.json);
    }

    get json() {
        return {
            ...this.object,
            ...this.more,
        };
    }

    get more() {
        return {
            count: this.count,
            realPrice: this.realPrice(new Date()),
        };
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

Book.permission = {
    user: ['read'],
    employee: ['read', 'create', 'update'],
};

export default Book;
