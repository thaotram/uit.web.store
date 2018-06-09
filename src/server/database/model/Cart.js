import { Book, CartDetail, User } from '../database';
import Model from '../utils/Model';

class Cart extends Model {
    /**
     * @param {Realm} realm
     * @param {User} user
     * @param {CartDetail} cartDetails
     */
    static async create(realm, user, cartDetails) {
        return new Promise((resolve, reject) => {
            if (
                !(user === null || User.isValid(realm, user)) ||
                !CartDetail.isRawValid(cartDetails)
            ) {
                reject(`User or CartDetail doesn't exist`);
                return;
            }
            realm.write(() => {
                const cart = realm.create(
                    'Cart',
                    {
                        id: Cart.getNextId(realm),
                        owner: user,
                        create: new Date(),
                    },
                    true,
                );
                cartDetails.forEach(cartDetail => {
                    realm.create('CartDetail', {
                        id: CartDetail.getNextId(realm),
                        cart: cart,
                        book: Book.getById(realm, cartDetail.id),
                        amount: cartDetail.amount,
                    });
                });
                resolve(cart);
            });
        });
    }

    get total() {
        let money = 0;
        this.cartDetail.forEach(detail => {
            money += detail.book.realPrice(this.create) * detail.amount;
        });
        return money;
    }

    get isSold(){
        return this.exportBill[0] != null;
    }
}

Cart.schema = {
    name: 'Cart',
    primaryKey: 'id',

    properties: {
        id: 'int',
        owner: 'User',
        create: 'date',

        cartDetails: {
            type: 'linkingObjects',
            objectType: 'CartDetail',
            property: 'cart',
        },
        exportBill: {
            type: 'linkingObjects',
            objectType: 'ExportBill',
            property: 'cart',
        },
    },
};

export default Cart;
