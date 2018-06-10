import { assert } from 'chai';
import { filename, itname } from '../utils/utils';
import database, { ExportBill } from '../../src/server/database/database';

describe(filename(__filename), function() {
    this.timeout(1000000);

    it(itname('ImportCoupon.create()', 'Tạo hóa đơn xuất'), async function() {
        const realm = await database();
        const employee = realm.objects('Employee')[1];
        const cart = realm.objects('Cart')[0];

        try {
            const exportBill = await ExportBill.create(realm, cart, employee);

            assert.isTrue(exportBill instanceof ExportBill);
            assert.equal(exportBill.cart[0].id, cart.id);
        } catch (e) {
            assert.equal(e, 'ExportBill is exist');
        }
    });
});
