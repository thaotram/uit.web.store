/* eslint no-unused-vars: 0 */
import { filename } from '../utils/utils';
import { assert } from 'chai';
import database from '../../src/server/database/database';
import { writeList } from '../../src/server/database/tiki';

describe(filename(__filename), function() {
    this.timeout(100 * 1000);

    it('❤️💛💚💙💜', async function() {
        // const realm = await database();
        // const url = 'https://tiki.vn/nha-sach-tiki/c8322?order=position';
        // await writeList(realm, url);
        // assert.isTrue(true, 'avc');
    });
});
