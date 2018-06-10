import { assert } from 'chai';
import { filename, itname } from '../utils/utils';
import database, { Supplier } from '../../src/server/database/database';

describe(filename(__filename), function() {
    this.timeout(1000000);

    it(itname('Supplier.create()', 'Thêm nhà cung cấp'), async function() {
        const realm = await database();
        const rawSupplier = {
            name: 'Nhà xuất bản Giáo dục Việt Nam',
            address: '81 Trần Hưng Đạo, Hoàn Kiếm, Hà Nội',
            phone: '02438220801',
        };
        try {
            const supplier = await Supplier.create(realm, rawSupplier);
            assert.isTrue(supplier instanceof Supplier);
            assert.equal(supplier.name, rawSupplier.name);
        } catch (e) {
            assert.equal(e, 'Supplier is exist');
        }
    });
});
