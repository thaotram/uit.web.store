import Realm from 'realm';
import OrderCoupon from '../model/OrderCoupon';
import OrderCouponDetail from '../model/OrderCouponDetail';
import Book from '../model/Book';
import Employee from '../model/Employee';
import Supplier from '../model/Supplier';

/**
    
const orderCouponDetails
 = [
    { id: 1517213, amount: 1 },
    { id: 1517213, amount: 1 },
];

 * @param {Realm} realm
 * @param {Employee} employee
 * @param {Supplier} supplier
 * @param {Object[]} orderCouponDetails
 * 
 */
export default async function(
    realm,
    supplier,
    employee,
    orderCouponDetails,
) {
    return new Promise((resolve, reject) => {
        if (
            !Supplier.isValid(realm, supplier) ||
            !Employee.isValid(realm, employee) ||
            !OrderCouponDetail.isRawValid(
                orderCouponDetails,
            )
        ) {
            reject(
                `Supplier, Employee or OrderCouponDetail doesn't exist`,
            );
            return;
        }
        realm.write(() => {
            const orderCoupon = realm.create(
                'OrderCoupon',
                {
                    id: OrderCoupon.getNextId(realm),
                    supplier: supplier,
                    employee: employee,
                    create: new Date(),
                },
                true,
            );
            orderCouponDetails.forEach(orderCouponDetail => {
                realm.create('OrderCouponDetail', {
                    id: OrderCouponDetail.getNextId(realm),
                    orderCoupon: orderCoupon,
                    book: Book.getBookById(
                        realm,
                        orderCouponDetail.id,
                    ),
                    amount: orderCouponDetail.amount,
                });
            });
            resolve(orderCoupon);
        });
    });
}
