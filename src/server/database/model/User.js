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
            return userFromSession;
        }

        const info = await getUserInfo(req.token);
        if (info === null) {
            return null;
        }

        const userFromDatabase = User.getById(realm, Number(info.id));
        if (userFromDatabase !== undefined) {
            setUserSession(userFromDatabase, sessionID);
            return userFromDatabase;
        }

        const userFromToken = await User.write(realm, false, {
            id: Number(info.id),
            name: info.name,
            point: 0,
        });
        if (userFromToken) {
            setUserSession(userFromToken, sessionID);
            return userFromToken;
        }

        return null;
    }

    get json() {
        const o = this.object;
        return o;
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
