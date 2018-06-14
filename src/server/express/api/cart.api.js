import { Cart, User } from '../../database/database';

/**
 *
 * @param {Express.Application} app
 * @param {Realm} realm
 */
export default function(app, realm) {
    app.post('/api/cart/create', async (req, res) => {
        const userId = Number(req.body.userId);
        const user = User.getById(realm, userId);
        const cart = await Cart.create(realm, user, req.body.cartDetails);
        res.send(cart.json);
    });

    app.get('/api/carts', async (req, res) => {
        const carts = await Cart.queryCart(realm, req.query);
        if (!carts) {
            res.json({ error: `Không tìm thấy` });
            return;
        }
        res.json(carts.map(cart => cart.json));
    });
}
