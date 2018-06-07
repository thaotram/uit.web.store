import Realm from 'realm';

class OrderCoupon {
    static getNextId(realm) {
        const items = realm.objects('OrderCoupon');
        return items.length == 0 ? 1 : items.max('id') + 1;
    }
    static isValid(realm, orderCoupon) {
        if (!orderCoupon) {
            return false;
        }
        return (
            realm
                .objects('OrderCoupon')
                .filtered(`id == ${orderCoupon.id}`)[0] !==
            undefined
        );
    }
}

OrderCoupon.schema = {
    name: 'OrderCoupon',
    primaryKey: 'id',

    properties: {
        id: 'int',
        supplier: 'Supplier',
        employee: 'Employee',
        create: 'date',

        orderDetail: {
            type: 'linkingObjects',
            objectType: 'OrderCouponDetail',
            property: 'orderCoupon',
        },
    },
};

export default OrderCoupon;
