import { assert } from 'chai';
import writeDataFromRaw from '../../src/server/database/tool/writeDataFromRaw';
import writeDataFromUrlList from '../../src/server/database/tool/writeDataFromUrlList';
import getRawBook from '../../src/server/database/tool/getRawBook';
import getDatabase from '../../src/server/database/database';

describe('Lưu thông tin có từ Tiki vào csdl', function() {
    this.timeout(1000000);

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

        await writeDataFromRaw(realm, rawBook);
    });

    it('Lưu thông tin sách từ url', async function() {
        const realm = await getDatabase();

        const url = 'https://tiki.vn/nha-sach-tiki/c8322';
        await writeDataFromUrlList(realm, url);
    });
});
