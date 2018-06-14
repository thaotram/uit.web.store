import { isNameValid, isAddressValid, isPhoneValid } from '../utils/Validation';
import Model from '../utils/Model';

class Supplier extends Model {
    static isRawValid(supplier) {
        isNameValid(supplier.name);
        isAddressValid(supplier.address);
        isPhoneValid(supplier.phone);
    }
    /**
     * @param {Realm} realm
     * @param {String} name
     */
    static getByName(realm, name) {
        return realm.objects('Supplier').filtered(`name LIKE $0`, name)[0];
    }

    /**
     *
     * @param {Realm} realm
     * @param {Supplier} rawSupplier
     * @returns {Promise<Supplier>}
     */
    static async create(realm, rawSupplier) {
        Supplier.isRawValid(rawSupplier);
        
        if (Supplier.getByName(realm, rawSupplier.name) !== undefined) {
            throw 'Supplier is exist';
        }
        return await Supplier.write(realm, true, {
            id: Supplier.getNextId(realm),
            name: rawSupplier.name,
            address: rawSupplier.address,
            phone: rawSupplier.phone,
        });
    }

    /**
     *
     * @param {Realm} realm
     * @param {Object} data
     */
    async update(realm, data) {
        await realm.write(() => {
            if (data.hasOwnProperty('name')) {
                isNameValid(data.name);
                this.name = data.name;
            }
            if (data.hasOwnProperty('address')) {
                isAddressValid(data.address);
            }
            if (data.hasOwnProperty('phone')) {
                isPhoneValid(data.phone);
                this.phone = data.phone;
            }
        });
    }

    get loan() {
        let money = 0;
        money += this.paymentCoupons.sum('money');
        this.importCoupons.forEach(importCoupon => (money -= importCoupon.total));
        return money;
    }
    /**
     * công nợ đến thời điểm bất kỳ
     * vd: tháng, năm, quý
     * @param {Date} end
     */
    async loanTo(end) {
        return new Promise((resolve, reject) => {
            let money = 0;
            if (typeof end != 'object' || end.constructor.name !== 'Date') {
                reject(`Date is invalid`);
                return;
            }

            money += this.paymentCoupons.filtered('create < $0', end).sum('money');
            this.importCoupons
                .filtered('create < $0', end)
                .forEach(importCoupon => (money -= importCoupon.total));
            resolve(money);
        });
    }
    /**
     * công nợ trong 1 khoảng thời gian
     * vd: tháng, năm, quý
     * @param {Date} begin
     * @param {Date} end
     */
    async loanAround(begin, end) {
        return new Promise((resolve, reject) => {
            let money = 0;
            if (
                typeof end != 'object' ||
                end.constructor.name !== 'Date' ||
                typeof begin != 'object' ||
                begin.constructor.name !== 'Date'
            ) {
                reject(`Date is invalid`);
                return;
            }
            money += this.paymentCoupons
                .filtered('$0 < create AND create < $1', begin, end)
                .sum('money');
            this.importCoupons
                .filtered('$0 < create AND create < $1', begin, end)
                .forEach(importCoupon => (money -= importCoupon.total));
            resolve(money);
        });
    }

    get json() {
        const o = this.object;
        return o;
    }
}

Supplier.schema = {
    name: 'Supplier',
    primaryKey: 'id',

    properties: {
        id: 'int',
        name: 'string',
        address: 'string',
        phone: 'string',

        orderCoupons: {
            type: 'linkingObjects',
            objectType: 'OrderCoupon',
            property: 'supplier',
        },
        importCoupons: {
            type: 'linkingObjects',
            objectType: 'ImportCoupon',
            property: 'supplier',
        },
        paymentCoupons: {
            type: 'linkingObjects',
            objectType: 'PaymentCoupon',
            property: 'supplier',
        },
    },
};

export default Supplier;
