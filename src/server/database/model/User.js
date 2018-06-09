import { getUserInfo } from '../utils/Facebook';
import Model from '../utils/Model';

class User extends Model {
    /**
     *
     * @param {Realm} realm
     * @param {String} accessToken
     */
    static async getByAccessToken(realm, accessToken) {
        return new Promise(async (resolve, reject) => {
            const info = await getUserInfo(accessToken);
            if (info.error) {
                reject({ error: `Can't get user info` });
                return;
            }
            console.log(1);

            const user = User.getById(Number(info.id));

            console.log(1);
            if (user != null) {
                resolve(user);
                return;
            }
            realm.write(() => {
                resolve(
                    realm.create(
                        'User',
                        {
                            id: Number(info.id),
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
