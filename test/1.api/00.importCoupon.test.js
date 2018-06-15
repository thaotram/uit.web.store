import { assert } from 'chai';
import { filename, itname } from '../utils/utils';
import database, { ImportCoupon } from '../../src/server/database/database';

describe(filename(__filename), function() {
    this.timeout(1000000);

    it(itname('ImportCoupon.getJsons()', 'Danh sách phiếu nhập hàng'), async function() {
        const realm = await database();
        const importCoupon = await ImportCoupon.getJsons(realm);

        assert.isArray(importCoupon, 'Phải là mảng');
    });
});
