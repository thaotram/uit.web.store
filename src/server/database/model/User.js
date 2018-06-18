import {
    getUserByRequestAndSessionID,
    getUserBySessionID,
    getUserInfo,
    setUserSession,
} from '../../credential/facebook.server';
import Model from '../utils/Model';
import { Employee } from '../database';

class User extends Model {
    /**
     * @param {{token: String, id: Number}} req
     * @param {String} sessionID
     * @return {Promise<User>}
     */
    static async get(req, sessionID) {
        const userFromSession = getUserByRequestAndSessionID(req, sessionID);
        if (userFromSession instanceof User) {
            return userFromSession;
        }

        const info = await getUserInfo(req.token);
        if (info === null) {
            return null;
        }

        const userFromDatabase = User.getById(Number(info.id));
        if (userFromDatabase !== undefined) {
            setUserSession(userFromDatabase, sessionID);
            return userFromDatabase;
        }

        const userFromToken = await User.write({
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

    /**
     *
     * @param {String} sessionID
     * @returns {User | undefined}
     */
    static getBySessionId(sessionID) {
        return getUserBySessionID(sessionID);
    }

    /**
     * @return {Employee}
     */
    get staff() {
        return this.employee[0];
    }

    get json() {
        return {
            ...this.object,
            ...this.detail,
        };
    }

    get detail() {
        return {
            total: this.carts.map(cart => cart.total).reduce((a, b) => a + b, 0),
            count: this.carts.map(cart => cart.count).reduce((a, b) => a + b, 0),
        };
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
