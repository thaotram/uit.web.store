import { Book, Employee, ImportCouponDetail, Supplier } from '../database';
import Model from '../utils/Model';

class ImportCoupon extends Model {
    /**
     * @param {Realm} realm
     * @param {Supplier} supplier
     * @param {Employee} employee
     * @param {String} shipper
     * @param {Object[]} importCouponDetails
     */
    static async aaa(realm, supplier, employee, shipper, importCouponDetails) {
        return new Promise((resolve, reject) => {
            if (
                !Supplier.isValid(realm, supplier) ||
                !Employee.isValid(realm, employee) ||
                !ImportCouponDetail.isRawValid(importCouponDetails)
            ) {
                reject(`Supplier, Employee or ImportCouponDetail doesn't exist`);
                return;
            }
            if (typeof shipper !== 'string') return false;
            realm.write(() => {
                const importCoupon = realm.create(
                    'ImportCoupon',
                    {
                        id: ImportCoupon.getNextId(realm),
                        supplier: supplier,
                        employee: employee,
                        create: new Date(),
                        shipper: shipper,
                    },
                    true,
                );
                importCouponDetails.forEach(importCouponDetail => {
                    realm.create('ImportCouponDetail', {
                        id: ImportCouponDetail.getNextId(realm),
                        importCoupon: importCoupon,
                        book: Book.getById(realm, importCouponDetail.id),
                        amount: importCouponDetail.amount,
                        price: importCouponDetail.price,
                    });
                });
                resolve(importCoupon);
            });
        });
    }

    get total() {
        let money = 0;
        this.importDetail.forEach(detail => {
            money += detail.price * detail.amount;
        });
        return money;
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

        importDetails: {
            type: 'linkingObjects',
            objectType: 'ImportCouponDetail',
            property: 'importCoupon',
        },
    },
};

export default ImportCoupon;
