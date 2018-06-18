import { Book } from '../database';
import Model from '../utils/Model';

class Price extends Model {
    /**
     * @param {{bookId: Number, price: Number}} data
     */
    static async create(data) {
        const book = await Book.getById(data.bookId);
        if (!book) throw 'Không tìm thấy sách';

        /**
         * @type {Price}
         */
        const lastPrice = book.realPriceObject();

        if (!lastPrice || lastPrice !== data.price) {
            return await Price.write({
                id: Price.nextId,
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
