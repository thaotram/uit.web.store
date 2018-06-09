import { assert } from 'chai';
import database, { Book } from '../../src/server/database/database';
import { getRawBook, writeList } from '../../src/server/database/tiki';

describe('Tiki test', function() {
    this.timeout(30 * 1000);

    it('Lưu thông tin sách từ id', async () => {
        const id = '580112';

        const callDatabase = database();
        const callRawBook = getRawBook(id);

        const realm = await callDatabase;
        const rawBook = await callRawBook;

        const book = await Book.create(realm, rawBook);

        assert.isTrue(book instanceof Book, 'Phải tạo ra một thể hiện của Book');
    });

    it('Lưu thông tin sách từ url', async () => {
        const realm = await database();

        const url = 'https://tiki.vn/nha-sach-tiki/c8322';
        await writeList(realm, url);
    });
});
