import ImportCoupon from '../../model/ImportCoupon';
import ImportCouponDetail from '../../model/ImportCouponDetail';
import Book from '../../model/Book';
import Employee from '../../model/Employee';
import Supplier from '../../model/Supplier';

/**
    
const importCouponDetails
 = [
    { id: 1517213, amount: 1, price: 100000 },
    { id: 1517213, amount: 1, price: 150000 },
];

 * @param {Realm} realm
 * @param {Employee} employee
 * @param {Supplier} supplier
 * @param {Object[]} importCouponDetails
 * 
 */
export default async function(
    realm,
    supplier,
    employee,
    shipper,
    importCouponDetails,
) {
    return new Promise((resolve, reject) => {
        if (
            !Supplier.isValid(realm, supplier) ||
            !Employee.isValid(realm, employee) ||
            !ImportCouponDetail.isRawValid(
                importCouponDetails,
            )
        ) {
            reject(
                `Supplier, Employee or ImportCouponDetail doesn't exist`,
            );
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
            importCouponDetails.forEach(
                importCouponDetail => {
                    realm.create('ImportCouponDetail', {
                        id: ImportCouponDetail.getNextId(
                            realm,
                        ),
                        importCoupon: importCoupon,
                        book: Book.getBookById(
                            realm,
                            importCouponDetail.id,
                        ),
                        amount: importCouponDetail.amount,
                        price: importCouponDetail.price,
                    });
                },
            );
            resolve(importCoupon);
        });
    });
}
