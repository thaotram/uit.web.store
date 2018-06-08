import { assert } from 'chai';
import getDatabase from '../../src/server/database/database';

describe('Đoạn lệnh này chỉ chạy một lần', function() {
    this.timeout(1000000);

    it('Chạy', async function() {
        const realm = await getDatabase();
        // await writeDataFromUrlList(realm, url);
        assert.equal(1,1);
    });
});
