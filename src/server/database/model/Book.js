import { json } from '../business/Utils';

class Book {
    /**
     * @param {Date} time
     */
    realPrice(time) {
        return this.price.filtered(`time <= $0`, time).sorted('time', true)[0].price;
    }
    static isValid(realm, book) {
        if (!book) {
            return false;
        }
        return realm.objects('Book').filtered(`id == ${book.id}`)[0] !== undefined;
    }
    static getBookById(realm, id) {
        return realm.objects('Book').filtered(`id == ${id}`)[0];
    }
    static getJsonBooks(realm) {
        return realm.objects('Book').map(book => book.json);
    }

    get json() {
        const o = json(Book, this);
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

        category: 'Category[]',

        //giá bán
        price: {
            type: 'linkingObjects',
            objectType: 'Price',
            property: 'book',
        },
        cartDetail: {
            type: 'linkingObjects',
            objectType: 'CartDetail',
            property: 'book',
        },
        orderDetail: {
            type: 'linkingObjects',
            objectType: 'OrderCouponDetail',
            property: 'book',
        },
        importDetail: {
            type: 'linkingObjects',
            objectType: 'ImportCouponDetail',
            property: 'book',
        },
    },
};

export default Book;
