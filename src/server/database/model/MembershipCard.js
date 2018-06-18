import { User, Employee } from '../database';
import Model from '../utils/Model';
//
class MembershipCard extends Model {
    /**
     * @param {import('../../socket/utils/interface').Create} create
     */
    static async create(create) {
        const employee = create.authorize.staff;
        const user = create.user;

        if (!User.has(user) || !Employee.has(employee)) {
            throw `Người dùng hoặc nhân viên không tồn tại`;
        }
        return await MembershipCard.write({
            id: MembershipCard.nextId,
            owner: user,
            employee: employee,
            create: new Date(),
            valid: true,
        });
    }

    get json() {
        return this.object;
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

MembershipCard.permission = {
    user: [],
    employee: ['read', 'create', 'update'],
};

export default MembershipCard;
