import { assert } from 'chai';
import getDatabase from '../../src/server/database/database';
import getAllBook from '../../src/server/database/business/Book/getAllBooks';
import Book from '../../src/server/database/model/Book';

describe('Đoạn lệnh này chỉ chạy một lần', function() {
    this.timeout(1000000);

    it('Chạy', async function() {
        const realm = await getDatabase();
        const books = Book.getJsonBooks(realm);
        console.log(books);

        assert.isArray(books, 'json trả về phải là một object');
    });
});
