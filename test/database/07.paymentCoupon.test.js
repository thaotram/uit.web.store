import { assert } from 'chai';
import { filename, itname } from '../utils/utils';
import database, { PaymentCoupon } from '../../src/server/database/database';

describe(filename(__filename), function() {
    this.timeout(1000000);

    it(
        itname('PaymentCoupon.create()', 'Tạo phiếu trả tiền nhà cung cấp'),
        async function() {
            const realm = await database();
            const supplier = realm.objects('Supplier')[0];
            const employee = realm.objects('Employee')[0];
            const rawPaymentCounpon = {
                content: 'Trả Tiền nợ tháng 6',
                money: 100000000,
            };
            try {
                const paymentCounpon = await PaymentCoupon.create(
                    realm,
                    supplier,
                    employee,
                    rawPaymentCounpon,
                );
                assert.isTrue(paymentCounpon instanceof PaymentCoupon);
                assert.equal(paymentCounpon.supplier.id, supplier.id);
            } catch (e) {
                assert.equal(e, 'PaymentCoupon is exist');
            }
        },
    );
});
