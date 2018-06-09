import { filename, itname } from '../utils/utils';
import { assert } from 'chai';
import database, { Book, Cart } from '../../src/server/database/database';

describe(filename(__filename), function() {
    this.timeout(10000);

    it(itname('book.json', 'Lấy json của một sách'), async function() {
        const realm = await database();
        const book = realm.objects('Book')[0];
        assert.isTrue(book instanceof Book, 'Phải là book');
        const json = book.json;
        assert.isObject(json, 'json trả về phải là một object');
    });

    it(itname('Book.getJsonBooks()', 'Lấy json của tất cả sách'), async function() {
        const realm = await database();
        const books = Book.getJsonBooks(realm);
        assert.isArray(books, 'json trả về phải là một object');
    });

    it(itname('Book.has()', 'Tồn tại đối tượng trong Class'), async function() {
        const realm = await database();

        const cart = realm.objects(Cart.schema.name)[0];
        const book = realm.objects(Book.schema.name)[0];

        assert.isFalse(Book.has(realm, cart), 'Cart không phải là một sách');
        assert.isTrue(Book.has(realm, book), 'book phải là một thể hiện của sách');
    });
});
