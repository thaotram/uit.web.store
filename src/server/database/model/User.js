import { getUserInfo } from '../utils/Facebook';
import Model from '../utils/Model';

class User extends Model {
    /**
     *
     * @param {Realm} realm
     * @param {String} accessToken
     */
    static async create(realm, accessToken) {
        return new Promise(async resolve => {
            const info = await getUserInfo(accessToken);
            realm.write(() => {
                resolve(
                    realm.create(
                        'User',
                        {
                            id: info.id,
                            name: info.name,
                            point: 0,
                        },
                        true,
                    ),
                );
            });
        });
    }

    get bills() {
        return this.carts.map(cart => cart.exportBill[0]);
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
