import Supplier from '../../model/Supplier';

/**
 *
 * @param {Realm} realm
 * @param {Supplier} rawSupplier
 */
export default async function(realm, rawSupplier) {
    return new Promise((resolve, reject) => {
        if (!Supplier.isRawValid(rawSupplier)) {
            reject('Information Error');
            return;
        }
        realm.write(() => {
            resolve(
                realm.create(
                    'Supplier',
                    {
                        id: Supplier.getNextId(realm),
                        name: rawSupplier.name,
                        address: rawSupplier.address,
                        phone: rawSupplier.phone,
                    },
                    true,
                ),
            );
        });
    });
}
