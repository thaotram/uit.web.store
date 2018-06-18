import { db, Book, Employee, ImportCouponDetail, Supplier } from '../database';
import Promise from 'bluebird';
import moment from 'moment';
import Model from '../utils/Model';

class ImportCoupon extends Model {
    /**
     * @param {Supplier} supplier
     * @param {Employee} employee
     * @param {String} shipper
     * @param {Object[]} importCouponDetails
     */
    static async create(supplier, employee, shipper, importCouponDetails) {
        ImportCouponDetail.isRawValid(importCouponDetails);
        if (!Supplier.has(supplier) || !Employee.has(employee)) {
            throw `Supplier, Employee doesn't exist`;
        }
        if (typeof shipper !== 'string') return false;

        const importCoupon = await ImportCoupon.write({
            id: ImportCoupon.nextId,
            supplier: supplier,
            employee: employee,
            create: new Date(),
            shipper: shipper,
        });

        await Promise.map(importCouponDetails, importCouponDetail => {
            ImportCouponDetail.write({
                id: ImportCouponDetail.nextId,
                importCoupon: importCoupon,
                book: Book.getById(importCouponDetail.bookId),
                count: importCouponDetail.count,
                price: importCouponDetail.price,
            });
        });
        return importCoupon;
    }

    /**
     * @param {import('../interface').queryImportCoupon} query
     * @return {Promise<Realm.Results<ImportCoupon>>}
     */
    static async queryImportCoupon(query) {
        let importCoupons = db.realm.objects('ImportCoupon');
        if (query.hasOwnProperty('employeeId')) {
            importCoupons = importCoupons.filtered('employee.id == $0', query.employeeId);
        }
        if (query.hasOwnProperty('supplierId')) {
            importCoupons = importCoupons.filtered('supplier.id == $0', query.supplierId);
        }
        if (query.hasOwnProperty('begin')) {
            const begin = moment(query.begin, 'DD-MM-YYYY').toDate();
            importCoupons = importCoupons.filtered('create >= $0', begin);
        }
        if (query.hasOwnProperty('end')) {
            const end = moment(query.end, 'DD-MM-YYYY').toDate();
            importCoupons = importCoupons.filtered('create >= $0', end);
        }
        return importCoupons;
    }

    get total() {
        return this.importCouponDetails
            .map(detail => detail.price * detail.count)
            .reduce((a, b) => a + b, 0);
    }

    get count() {
        return this.importCouponDetails
            .map(detail => detail.count)
            .reduce((a, b) => a + b, 0);
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

ImportCoupon.permission = {
    user: [],
    employee: ['read', 'create'],
};

export default ImportCoupon;
