import { Book, Employee, ImportCouponDetail, Supplier } from '../database';
import Model from '../utils/Model';
import Promise from 'bluebird';
import moment from 'moment';

class ImportCoupon extends Model {
    /**
     * @param {Realm} realm
     * @param {Supplier} supplier
     * @param {Employee} employee
     * @param {String} shipper
     * @param {Object[]} importCouponDetails
     */
    static async create(realm, supplier, employee, shipper, importCouponDetails) {
        if (
            !Supplier.has(realm, supplier) ||
            !Employee.has(realm, employee) ||
            !ImportCouponDetail.isRawValid(realm, importCouponDetails)
        ) {
            throw `Supplier, Employee or ImportCouponDetail doesn't exist`;
        }
        if (typeof shipper !== 'string') return false;

        const importCoupon = await ImportCoupon.write(realm, true, {
            id: ImportCoupon.getNextId(realm),
            supplier: supplier,
            employee: employee,
            create: new Date(),
            shipper: shipper,
        });

        await Promise.map(importCouponDetails, importCouponDetail => {
            ImportCouponDetail.write(realm, true, {
                id: ImportCouponDetail.getNextId(realm),
                importCoupon: importCoupon,
                book: Book.getById(realm, importCouponDetail.bookId),
                amount: importCouponDetail.amount,
                price: importCouponDetail.price,
            });
        });
        return importCoupon;
    }

    /**
     *
     * @param {Realm} realm
     * @param {import('../interface').QueryCart} query
     * @return {Promise<Realm.Results<ImportCoupon>>}
     */
    static async queryImportCoupon(realm, query) {
        let importCoupons = realm.objects('ImportCoupon');
        if (query.hasOwnProperty('employeeId')) {
            importCoupons = importCoupons.filtered('employee.id == $0', query.employeeId);
        }
        if (query.hasOwnProperty('supplierId')) {
            importCoupons = importCoupons.filtered('supplier.id == $0', query.supplierId);
        }
        if (query.hasOwnProperty('begin')) {
            const begin = moment(query.begin, 'DD-MM-YYYY');
            importCoupons = importCoupons.filtered('create >= $0', begin);
        }
        if (query.hasOwnProperty('end')) {
            const end = moment(query.end, 'DD-MM-YYYY');
            importCoupons = importCoupons.filtered('create >= $0', end);
        }
        return importCoupons;
    }

    get total() {
        let money = 0;
        this.importDetail.forEach(detail => {
            money += detail.price * detail.amount;
        });
        return money;
    }

    get json() {
        const o = this.object;
        o.supplierId = this.supplier.id;
        o.employeeId = this.employee.id;
        o.importCouponDetails = this.importCouponDetails.map(
            importCouponDetail => importCouponDetail.json,
        );
        return o;
    }
    static getJsons(realm) {
        return realm.objects('ImportCoupon').map(importCoupon => importCoupon.json);
    }
}

ImportCoupon.schema = {
    name: 'ImportCoupon',
    primaryKey: 'id',

    properties: {
        id: 'int',
        supplier: 'Supplier',
        employee: 'Employee',
        create: 'date',
        shipper: 'string',

        importCouponDetails: {
            type: 'linkingObjects',
            objectType: 'ImportCouponDetail',
            property: 'importCoupon',
        },
    },
};

export default ImportCoupon;
