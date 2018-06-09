import Model from '../utils/Model';

class ImportCouponDetail extends Model {
    static isRawValid(importCouponDetails) {
        if (!Array.isArray(importCouponDetails)) return false;

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
