/* eslint no-unused-vars: 0 */
import { filename } from '../utils/utils';
import { assert } from 'chai';
import database, {
    User,
    Cart,
    Supplier,
    Employee,
    PaymentCoupon,
    OrderCoupon,
    ImportCoupon,
    ExportBill,
} from '../../src/server/database/database';
import { writeList } from '../../src/server/database/tiki';

describe(filename(__filename), function() {
    this.timeout(100 * 1000);

    it('❤️💛💚💙💜', async function() {
        const realm = await database();
    });
});
