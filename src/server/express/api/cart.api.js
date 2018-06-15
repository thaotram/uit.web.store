import { Cart, User, Employee } from '../../database/database';

/**
 *
 * @param {Express.Application} app
 * @param {SocketIO.Server} io
 * @param {Realm} realm
 */
export default function(app, io, realm) {
    // không sử dụng, hàm chỉ dùng khi có trang bán hàng online
    app.post('/api/cart/create', async (req, res) => {
        const userId = Number(req.body.userId);
        const user = User.getById(realm, userId);
        const cart = await Cart.create(realm, user, req.body.cartDetails);
        res.send(cart.json);
    });

    app.get('/api/carts', async (req, res) => {
        Employee.getBySessionId(req.sessionID);

        const carts = await Cart.queryCart(realm, req.query);
        if (!carts) throw `Không tìm thấy`;
        res.json(carts.map(cart => cart.json));
    });
}
