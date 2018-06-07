import Realm from 'realm';

class ImportCoupon {
    static getNextId(realm) {
        const items = realm.objects('ImportCoupon');
        return items.length == 0 ? 1 : items.max('id') + 1;
    }
    static isValid(realm, importCoupon) {
        if (!importCoupon) {
            return false;
        }
        return (
            realm
                .objects('ImportCoupon')
                .filtered(`id == ${importCoupon.id}`)[0] !==
            undefined
        );
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

        importDetail: {
            type: 'linkingObjects',
            objectType: 'ImportCouponDetail',
            property: 'importCoupon',
        },
    },
};

export default ImportCoupon;
