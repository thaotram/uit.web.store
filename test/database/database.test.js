import { assert } from 'chai';
// import writeDataFromUrlList from '../../src/server/database/tool/writeDataFromUrlList';
import database from '../../src/server/database/database';

describe('Lưu thông tin có từ Tiki vào csdl', function() {
    it('Kiểm tra có tạo được CSDL hay không?', async () => {
        const realm = await database();
        assert.notEqual(realm, undefined);
    });
});
