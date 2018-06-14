import { assert } from 'chai';
import { filename, itname } from '../utils/utils';
import database, { OrderCoupon } from '../../src/server/database/database';

describe(filename(__filename), function() {
    this.timeout(1000000);

    it(
        itname('OrderCoupon.create()', 'Tạo phiếu đặt hàng nhà cung cấp'),
        async function() {
            const realm = await database();
            const supplier = realm.objects('Supplier')[0];
            const employee = realm.objects('Employee')[0];
            const orderCouponDetails = [
                {
                    bookId: 2181161,
                    count: 30,
                },
                {
                    bookId: 1926791,
                    count: 20,
                },
            ];
            const orderCoupon = await OrderCoupon.create(
                realm,
                supplier,
                employee,
                orderCouponDetails,
            );
            assert.isTrue(orderCoupon instanceof OrderCoupon);
            assert.equal(
                orderCoupon.orderCouponDetails[0].book.id,
                orderCouponDetails[0].bookId,
            );
        },
    );
});
