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

    /**
     *
     * @param {Realm} realm
     * @param {{begin: Date, end: Date}} query
     */
    queryLoan(query) {
        let paymentCoupons = this.paymentCoupons;
        let importCoupons = this.importCoupons;
        if (query.hasOwnProperty('begin')) {
            if (query.begin instanceof Date) {
                paymentCoupons = paymentCoupons.filtered('create > $0', query.begin);
                importCoupons = importCoupons.filtered('create > $0', query.begin);
            }
        }
        if (query.hasOwnProperty('end')) {
            if (query.end instanceof Date) {
                paymentCoupons = paymentCoupons.filtered('create < $0', query.end);
                importCoupons = importCoupons.filtered('create < $0', query.end);
            }
        }
        return (
            -paymentCoupons.sum('money') +
            importCoupons
                .map(importCoupon => importCoupon.total)
                .reduce((a, b) => a + b, 0)
        );
    }

    /**
     * số tiền nợ Nhà cung cấp là số tiền mà mình nợ nhà cung cấp
     */
    get loan() {
        return this.queryLoan({});
    }

    get json() {
        const o = this.object;
        return o;
    }

    get detail() {
        return {
            total: this.importCoupons
                .map(importCoupon => importCoupon.total)
                .reduce((a, b) => a + b, 0),
            count: this.importCoupons
                .map(importCoupon => importCoupon.count)
                .reduce((a, b) => a + b, 0),
            loan: this.loan,
        };
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
