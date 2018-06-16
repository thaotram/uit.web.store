import Model from '../utils/Model';
import Book from './Book';

class Price extends Model {
    /**
     *
     * @param {Realm} realm
     * @param {{bookId: Number, price: Number}} data
     */
    static async create(realm, data) {
        const book = await Book.getById(realm, data.bookId);
        if (!book) throw 'Không tìm thấy sách';

        /**
         * @type {Price}
         */
        const lastPrice = book.realPriceObject();

        if (!lastPrice || lastPrice !== data.price) {
            return await Price.write(realm, true, {
                id: Price.getNextId(realm),
                time: new Date(),
                price: data.price,
                book: book,
            });
        }
        throw 'Không thể tạo giá mới bằng với giá cũ';
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
