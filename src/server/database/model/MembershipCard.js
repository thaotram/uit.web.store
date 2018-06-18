import { User, Employee } from '../database';
import Model from '../utils/Model';
//
class MembershipCard extends Model {
    /**
     * @param {User} user
     * @param {Employee} employee
     */
    static async create(user, employee) {
        if (!User.has(user) || !Employee.has(employee)) {
            throw `User or employee doesn't exist`;
        }
        if (user.billOwns.length === 0) {
            throw 'Dont Create';
        }
        return await MembershipCard.write({
            id: MembershipCard.nextId,
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
