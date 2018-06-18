import { assert } from 'chai';
import { filename, itname } from '../utils/utils';
import database, { ImportCoupon } from '../../src/server/database/database';

describe(filename(__filename), function() {
    this.timeout(1000000);

    it(
        itname('ImportCoupon.create()', 'Tạo phiếu nhập hàng nhà cung cấp'),
        async function() {
            const realm = await database();
            const supplier = realm.objects('Supplier')[0];
            const employee = realm.objects('Employee')[0];
            const shipper = 'Nguyễn Văn A';
            const importCouponDetails = [
                {
                    bookId: 2181161,
                    count: 10,
                    price: 50000,
                },
                {
                    bookId: 1926791,
                    count: 20,
                    price: 120000,
                },
            ];
            const importCoupon = await ImportCoupon.create(
                realm,
                supplier,
                employee,
                shipper,
                importCouponDetails,
            );
            assert.isTrue(importCoupon instanceof ImportCoupon);
            assert.equal(
                importCoupon.importCouponDetails[0].book.id,
                importCouponDetails[0].bookId,
            );
        },
    );
});
