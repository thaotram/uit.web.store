import Realm from 'realm';

import Model from './utils/Model';
import Book from './model/Book';
import User from './model/User';
import Cart from './model/Cart';
import Category from './model/Category';
import CartDetail from './model/CartDetail';
import ImportCouponDetail from './model/ImportCouponDetail';
import OrderCouponDetail from './model/OrderCouponDetail';
import Employee from './model/Employee';
import ExportBill from './model/ExportBill';
import ImportCoupon from './model/ImportCoupon';
import MembershipCard from './model/MembershipCard';
import OrderCoupon from './model/OrderCoupon';
import PaymentCoupon from './model/PaymentCoupon';
import Price from './model/Price';
import Supplier from './model/Supplier';

export {
    Model,
    Book,
    User,
    Cart,
    Category,
    CartDetail,
    ImportCouponDetail,
    OrderCouponDetail,
    Employee,
    ExportBill,
    ImportCoupon,
    MembershipCard,
    OrderCoupon,
    PaymentCoupon,
    Price,
    Supplier,
};

/**
 * @type {Realm}
 */
let instance = null;

export default class Database {
    /**
     * @return {Realm}
     */
    static async initialize() {
        return (
            (instance = await Realm.open({
                path: 'database/realm.realm',
                schema: [
                    Book,
                    Cart,
                    Category,
                    CartDetail,
                    ImportCouponDetail,
                    OrderCouponDetail,
                    Employee,
                    ExportBill,
                    ImportCoupon,
                    MembershipCard,
                    OrderCoupon,
                    PaymentCoupon,
                    Price,
                    Supplier,
                    User,
                ],
                deleteRealmIfMigrationNeeded: true,
            })) || instance
        );
    }
}

export const db = {
    get realm() {
        if (!(instance instanceof Realm)) {
            throw 'Đối tượng realm được gọi khi chưa được khởi tạo';
        }
        return instance;
    },
};
