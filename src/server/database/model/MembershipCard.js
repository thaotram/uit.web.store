import { User, Employee } from '../database';
import Model from '../utils/Model';
// 
class MembershipCard extends Model {
    /**
     * @param {Realm} realm
     * @param {User} user
     * @param {Employee} employee
     */
    static async create(realm, user, employee) {
        return new Promise((resolve, reject) => {
            if (!User.isValid(realm, user) || !Employee.isValid(realm, employee)) {
                reject(`User or employee doesn't exist`);
                return;
            }
            if (user.billOwns.length === 0) {
                reject('Dont Create');
                return;
            }
            realm.write(() => {
                resolve(
                    realm.create(
                        'MembershipCard',
                        {
                            id: MembershipCard.getNextId(realm),
                            owner: user,
                            employee: employee,
                            create: new Date(),
                            valid: true,
                        },
                        true,
                    ),
                );
            });
        });
    }
}

MembershipCard.schema = {
    name: 'MembershipCard',
    primaryKey: 'id',

    properties: {
        id: 'int',
        owner: 'User',
        employee: 'Employee',

        create: 'date',
        valid: 'bool',
    },
};

export default MembershipCard;
