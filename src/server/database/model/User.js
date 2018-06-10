import { getUserInfo } from '../utils/Facebook';
import Model from '../utils/Model';

class User extends Model {
    /**
     *
     * @param {Realm} realm
     * @param {String} accessToken
     */
    static async getByAccessToken(realm, accessToken) {
        const info = await getUserInfo(accessToken);
        const user = User.getById(realm, Number(info.id));
        if (user != null) return user;

        return await User.write(realm, false, {
            id: Number(info.id),
            name: info.name,
            point: 0,
        });
    }

    get cartsJson() {
        return this.carts.map(cart => cart.jsonWithoutUser);
    }

    // get exportBills() {
    //     return this.carts
    //         .map(cart => cart.exportBill[0])
    //         .filter(exportBill => exportBill !== undefined);
    // }

    // get exportBillsJson() {
    //     return this.exportBills.map(exportBill => exportBill.json);
    // }
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
