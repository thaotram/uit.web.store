import { assert } from 'chai';
import { filename, itname } from '../utils/utils';
import database, { ImportCoupon } from '../../src/server/database/database';

describe(filename(__filename), function() {
    this.timeout(1000000);

    it(itname('ImportCoupon.getJsons()', 'Danh sách phiếu nhập hàng'), async function() {
        const realm = await database();

        const importCoupon = await ImportCoupon.getJsons(realm);
        // const user = realm.objects('User')[0];
        console.log(JSON.stringify(importCoupon, null, 2));
        // const cartDetails = [{ id: 580112, amount: 2 }, { id: 750578, amount: 1 }];
        // const cart = await Cart.create(realm, user, cartDetails);
        // assert.equal(cart.owner.name, 'Lê Thị Thảo Trâm');
    });
});
