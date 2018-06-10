import Promise from 'bluebird';
import { Book, CartDetail, User } from '../database';
import Model from '../utils/Model';

class Cart extends Model {
    /**
     * @param {Realm} realm
     * @param {User} user
     * @param {CartDetail} cartDetails
     */
    static async create(realm, user, cartDetails) {
        if (
            !(user === null || User.has(realm, user)) ||
            !CartDetail.isRawValid(cartDetails)
        ) {
            throw `User or CartDetail doesn't exist`;
        }
        const cart = await Cart.write(realm, true, {
            id: Cart.getNextId(realm),
            owner: user,
            create: new Date(),
        });
        await Promise.map(cartDetails, async cartDetail => {
            await CartDetail.write(realm, false, {
                id: CartDetail.getNextId(realm),
                cart: cart,
                book: Book.getById(realm, cartDetail.id),
                amount: cartDetail.amount,
            });
        });
        return cart;
    }

    get total() {
        let money = 0;
        this.cartDetail.forEach(detail => {
            money += detail.book.realPrice(this.create) * detail.amount;
        });
        return money;
    }

    get jsonWithoutUser() {
        const o = this.object;
        const exportBill = this.exportBill[0];
        if (exportBill !== undefined) o.exportBill = exportBill.jsonWithoutCart;
        o.cartDetails = this.cartDetails.map(cartDetail => cartDetail.json);
        return o;
    }

    get isSold() {
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
