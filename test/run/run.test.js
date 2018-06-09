/* eslint no-unused-vars: 0 */

import { assert } from 'chai';
import database, { Cart, Book } from '../../src/server/database/database';
import { getRawBook, writeList } from '../../src/server/database/tiki';

describe('♦ Kiểm thử ♦', function() {
    this.timeout(1000000);

    it('♦ ♦ ♦ ♦', async () => {
        const realm = await database();
        const url = 'https://tiki.vn/nha-sach-tiki/c8322?order=position';
        await writeList(realm, url);
        assert.isTrue(true, 'avc');
    });
});
