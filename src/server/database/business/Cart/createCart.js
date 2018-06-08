import User from '../../model/User';
import Cart from '../../model/Cart';
import CartDetail from '../../model/CartDetail';
import Book from '../../model/Book';

/**
const cartDetails = [
    { id: 1517213, amount: 1 },
    { id: 1517213, amount: 1 },
];
 * @param {Realm} realm
 * @param {User} user
 * @param {Object[]} cartDetails
 */
export default async function(realm, user, cartDetails) {
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
                    book: Book.getBookById(
                        realm,
                        cartDetail.id,
                    ),
                    amount: cartDetail.amount,
                });
            });
            resolve(cart);
        });
    });
}
