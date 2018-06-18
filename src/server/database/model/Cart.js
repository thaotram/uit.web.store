import Promise from 'bluebird';
import { Book, CartDetail, User } from '../database';
import Model from '../utils/Model';
import moment from 'moment';

class Cart extends Model {
    /**
     * @param {import('../../socket/utils/interface').Create} create
     * @returns {Promise<Cart>}
     */
    static async create(create) {
        CartDetail.isRawValid(create.details);
        if (!(create.user === undefined || User.has(create.user))) {
            throw `Người dùng không tồn tại`;
        }
        const cart = await Cart.write({
            id: Cart.nextId,
            owner: create.user,
            create: new Date(),
        });
        await Promise.map(create.details, async cartDetail => {
            await CartDetail.write({
                id: CartDetail.nextId,
                cart: cart,
                book: Book.getById(cartDetail.bookId),
                count: cartDetail.count,
            });
        });
        return cart;
    }

    /**
     * @param {import('../interface').QueryCart} query
     * @return {Promise<Realm.Results<Cart>>}
     */
    static async queryCart(query) {
        let carts = Cart.list;
        if (query.hasOwnProperty('userId')) {
            carts = carts.filtered('owner != null && owner.id == $0', query.userId);
        }
        if (query.hasOwnProperty('isBill')) {
            if (query.isBill == true) {
                carts = carts.filtered('exportBill != null');
            } else {
                carts = carts.filtered('exportBill == null');
            }
        }
        if (query.hasOwnProperty('begin')) {
            const begin = moment(query.begin, 'DD-MM-YYYY').toDate();
            carts = carts.filtered('create >= $0', begin);
        }
        if (query.hasOwnProperty('end')) {
            const end = moment(query.end, 'DD-MM-YYYY').toDate();
            carts = carts.filtered('create <= $0', end);
        }
        return carts;
    }

    get total() {
        return this.cartDetails
            .map(cartDetail => cartDetail.book.realPrice(this.create) * cartDetail.count)
            .reduce((a, b) => a + b, 0);
    }

    get count() {
        return this.cartDetails
            .map(cartDetail => cartDetail.count)
            .reduce((a, b) => a + b, 0);
    }

    get json() {
        const o = {
            ...this.object,
            userId: !this.owner ? undefined : this.owner.id,
            cartDetails: this.cartDetails.map(cartDetail => cartDetail.json),
        };
        const exportBill = this.exportBill_;
        if (exportBill !== undefined) {
            o.exportBill = {
                ...exportBill.json,
                ...exportBill.detail,
            };
        }
        return o;
    }

    get isSold() {
        return this.exportBill[0] != null;
    }

    get exportBill_() {
        return this.exportBill[0];
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

Cart.permission = {
    user: ['read', 'create'],
    employee: ['read', 'create', 'update'],
};

export default Cart;
