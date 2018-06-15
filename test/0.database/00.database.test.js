import { filename, itname } from '../utils/utils';
import { assert } from 'chai';
import database from '../../src/server/database/database';

describe(filename(__filename), function() {
    it(itname('.database()', 'Khởi tạo cơ sở dữ liệu?'), async function() {
        const realm = await database();
        assert.notEqual(realm, undefined);
    });
});
