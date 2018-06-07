import Realm from 'realm';

class ImportCouponDetail {
    static getNextId(realm) {
        const items = realm.objects('ImportCouponDetail');
        return items.length == 0 ? 1 : items.max('id') + 1;
    }
    static isValid(realm, importCouponDetail) {
        if (!importCouponDetail) {
            return false;
        }
        return (
            realm
                .objects('ImportCouponDetail')
                .filtered(
                    `id == ${importCouponDetail.id}`,
                )[0] !== undefined
        );
    }
    static isRawValid(importCouponDetails) {
        if (!Array.isArray(importCouponDetails))
            return false;

        return importCouponDetails.every(detail => {
            console.log(detail);

            if (typeof detail != 'object') return false;
            if (
                !detail.hasOwnProperty('id') ||
                !detail.hasOwnProperty('amount') ||
                !detail.hasOwnProperty('price')
            ) {
                return false;
            }
            if (
                typeof detail.id != 'number' ||
                typeof detail.amount != 'number' ||
                typeof detail.price != 'number'
            ) {
                return false;
            }
            if (detail.amount <= 0) return false;
            if (detail.price <= 0) return false;
            return true;
        });
    }
}

ImportCouponDetail.schema = {
    name: 'ImportCouponDetail',
    primaryKey: 'id',

    properties: {
        id: 'int',
        importCoupon: 'ImportCoupon',
        book: 'Book',
        amount: 'int',
        price: 'int',
    },
};

export default ImportCouponDetail;
