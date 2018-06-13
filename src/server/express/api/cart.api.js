import { Cart } from '../../database/database';

/**
 *
 * @param {Express.Application} app
 * @param {Realm} realm
 */
export default function(app, realm) {
    app.get('/api/carts', async (req, res) => {
        const carts = await Cart.queryCart(realm, req.query);
        if (!carts) {
            res.json({ error: `Không tìm thấy` });
            return;
        }
        res.json(carts.map(cart => cart.json));
    });
}
