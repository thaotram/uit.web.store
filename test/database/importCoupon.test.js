import { assert } from 'chai';
import { filename, itname } from '../utils/utils';
import database, { ImportCoupon } from '../../src/server/database/database';

describe(filename(__filename), function() {
    this.timeout(1000000);

    it(
        itname('ImportCoupon.create()', 'Tạo phiếu nhập hàng nhà cung cấp'),
        async function() {
            const realm = await database();
            const supplier = realm.objects('Supplier')[2];
            const employee = realm.objects('Employee')[1];
            const shipper = 'Nguyễn Văn A';
            const importCouponDetails = [
                {
                    bookId: 2181161,
                    amount: 10,
                    price: 50000,
                },
                {
                    bookId: 1926791,
                    amount: 20,
                    price: 120000,
                },
            ];
            try {
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
            } catch (e) {
                assert.equal(e, 'OrderCoupon is exist');
            }
        },
    );
});
