import {
    getUserFromSessionID,
    getUserInfo,
    setUserSession,
} from '../../credential/facebook.server';
import Model from '../utils/Model';

class User extends Model {
    /**
     *
     * @param {Realm} realm
     * @param {String} req chưa 2 tham số là token và id
     * @param {String} sessionID
     */
    static async get(realm, req, sessionID) {
        const userFromSession = getUserFromSessionID(req, sessionID);
        if (userFromSession instanceof User) {
            console.log('Người dùng đã đăng nhập từ session');
            return userFromSession;
        }

        const info = await getUserInfo(req.token);
        if (info === null) {
            console.log('Người dùng đăng nhập sai');
            return null;
        }

        const userFromDatabase = User.getById(realm, Number(info.id));
        if (userFromDatabase !== undefined) {
            setUserSession(userFromDatabase, sessionID);
            console.log('Lấy thông tin người dùng từ database');
            return userFromDatabase;
        }

        const userFromToken = await User.write(realm, false, {
            id: Number(info.id),
            name: info.name,
            point: 0,
        });
        if (userFromToken) {
            setUserSession(userFromToken, sessionID);
            console.log('Tạo mới người dùng');
            return userFromToken;
        }

        return null;
    }

    get cartsJson() {
        return this.carts.map(cart => cart.jsonWithoutUser);
    }
}

User.schema = {
    name: 'User',
    primaryKey: 'id',

    properties: {
        id: 'int',
        name: 'string',
        point: 'int',

        employee: {
            type: 'linkingObjects',
            objectType: 'Employee',
            property: 'user',
        },
        membershipCards: {
            type: 'linkingObjects',
            objectType: 'MembershipCard',
            property: 'owner',
        },
        carts: {
            type: 'linkingObjects',
            objectType: 'Cart',
            property: 'owner',
        },
    },
};

export default User;
