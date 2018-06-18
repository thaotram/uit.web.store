import { db } from '../database';
import Model from '../utils/Model';
import { isAddressValid, isNameValid, isPhoneValid } from '../utils/Validation';

class Supplier extends Model {
    static isRawValid(supplier) {
        isNameValid(supplier.name);
        isAddressValid(supplier.address);
        isPhoneValid(supplier.phone);
    }
    /**
     * @param {String} name
     */
    static getByName(name) {
        return db.realm.objects('Supplier').filtered(`name LIKE $0`, name)[0];
    }

    /**
     * @param {Supplier} rawSupplier
     * @returns {Promise<Supplier>}
     */
    static async create(rawSupplier) {
        Supplier.isRawValid(rawSupplier);
        if (Supplier.getByName(rawSupplier.name) !== undefined) {
            throw 'Supplier is exist';
        }
        return await Supplier.write({
            id: Supplier.nextId,
            name: rawSupplier.name,
            address: rawSupplier.address,
            phone: rawSupplier.phone,
        });
    }

    /**
     * @param {Object} data
     */
    async update(data) {
        await db.realm.write(() => {
            if (data.hasOwnProperty('name')) {
                isNameValid(data.name);
                this.name = data.name;
            }
            if (data.hasOwnProperty('address')) {
                isAddressValid(data.address);
                this.address = data.address;
            }
            if (data.hasOwnProperty('phone')) {
                isPhoneValid(data.phone);
                this.phone = data.phone;
            }
        });
    }

    /**
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
        return {
            ...this.object,
            ...this.detail,
        };
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
