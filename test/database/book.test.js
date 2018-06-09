import { assert } from 'chai';
import database, { Book, Cart } from '../../src/server/database/database';

describe('Class Book', function() {
    this.timeout(1000);

    it('[.json] Lấy json của một sách', async () => {
        const realm = await database();
        const book = realm.objects('Book')[0];
        if (book instanceof Book == false) return;
        const json = book.json;
        assert.isObject(json, 'json trả về phải là một object');
    });

    it('[.getJsonBooks] Lấy json của tất cả sách', async () => {
        const realm = await database();
        const books = Book.getJsonBooks(realm);
        assert.isArray(books, 'json trả về phải là một object');
    });

    it('[.has(realm, instance)]', async function() {
        const realm = await database();

        const cart = realm.objects(Cart.schema.name)[0];
        const book = realm.objects(Book.schema.name)[0];

        assert.isFalse(Book.has(realm, cart), 'Cart không phải là một sách');
        assert.isTrue(Book.has(realm, book), 'book phải là một thể hiện của sách');
    });
});
