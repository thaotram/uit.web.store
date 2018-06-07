import { assert } from 'chai';
import writeDataFromRaw from '../../src/server/database/tool/writeDataFromRaw';
import getRawBook from '../../src/server/database/tool/getRawBook';
import getDatabase from '../../src/server/database/database';

describe('Lưu thông tin có từ Tiki vào csdl', function() {
    this.timeout(20000);

    it('Kiểm tra có tạo được CSDL hay không?', async function() {
        const realm = await getDatabase();
        assert.notEqual(realm, undefined);
    });

    it('Lưu thông tin sách từ id', async function() {
        const id = '580112';

        const callDatabase = getDatabase();
        const callRawBook = getRawBook(id);

        const realm = await callDatabase;
        const rawBook = await callRawBook;

        const book = await writeDataFromRaw(realm, rawBook);
        // console.log(book);
    });
});
