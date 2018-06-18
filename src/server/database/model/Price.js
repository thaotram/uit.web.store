import { Book } from '../database';
import Model from '../utils/Model';

class Price extends Model {
    /**
     * @param {{price: Number, book: Book}} create
     */
    static async create(create) {
        const book = create.book;
        if (!Book.has(create.book)) throw 'Không tìm thấy sách';

        /**
         * @type {Price}
         */
        const lastPrice = book.realPriceObject();

        if (!lastPrice || lastPrice !== create.price) {
            return await Price.write({
                id: Price.nextId,
                time: new Date(),
                price: create.price,
                book: book,
            });
        }
        throw 'Không thể tạo giá mới bằng với giá cũ';
    }

    notification(io) {
        io.emit('push', {
            name: Price.schema.name,
            data: this.json,
        });
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

Price.permission = {
    user: [],
    employee: ['read', 'create'],
};

export default Price;
