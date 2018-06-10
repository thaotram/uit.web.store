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
        if (!User.isValid(realm, user) || !Employee.isValid(realm, employee)) {
            throw `User or employee doesn't exist`;
        }
        if (user.billOwns.length === 0) {
            throw 'Dont Create';
        }
        return await MembershipCard.write(realm, true, {
            id: MembershipCard.getNextId(realm),
            owner: user,
            employee: employee,
            create: new Date(),
            valid: true,
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
