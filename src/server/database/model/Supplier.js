import { db } from '../database';
import Model from '../utils/Model';
import { isAddressValid, isNameValid, isPhoneValid } from '../utils/Validation';

class Supplier extends Model {
    static isRawValid(create) {
        isNameValid(create.name);
        isAddressValid(create.address);
        isPhoneValid(create.phone);
    }
    /**
     * @param {String} name
     */
    static getByName(name) {
        return db.realm.objects('Supplier').filtered(`name LIKE $0`, name)[0];
    }

    /**
     * @param {import('../../socket/utils/interface').Create} create
     * @returns {Promise<Supplier>}
     */
    static async create(create) {
        Supplier.isRawValid(create);
        if (Supplier.getByName(create.name) !== undefined) {
            throw 'Nhà cung cấp không được trùng tên';
        }
        return await Supplier.write({
            id: Supplier.nextId,
            name: create.name,
            address: create.address,
            phone: create.phone,
        });
    }

    /**
     * @param {import('../../socket/utils/interface').Update} update
     */
    async update(update) {
        await db.realm.write(() => {
            if (update.hasOwnProperty('name')) {
                isNameValid(update.name);
                this.name = update.name;
            }
            if (update.hasOwnProperty('address')) {
                isAddressValid(update.address);
                this.address = update.address;
            }
            if (update.hasOwnProperty('phone')) {
                isPhoneValid(update.phone);
                this.phone = update.phone;
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

    get history() {
        return {
            history: {
                orderCoupons: this.orderCoupons.map(e => e.json),
                importCoupons: this.importCoupons.map(e => e.json),
                paymentCoupons: this.paymentCoupons.map(e => e.json),
            },
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

    notification(io) {
        io.emit('push', {
            name: Supplier.schema.name,
            data: this.json,
        });
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

Supplier.permission = {
    user: [],
    employee: ['read', 'create', 'update'],
};

export default Supplier;
