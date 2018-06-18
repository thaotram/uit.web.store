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
            throw `Người dùng hoặc nhân viên không tồn tại`;
        }
        if (user.billOwns.length === 0) {
            throw 'Không thể tạo';
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

    notification(io) {
        io.emit('push', {
            name: MembershipCard.schema.name,
            data: this.json,
        });
        io.emit('update', {
            name: User.schema.name,
            data: this.user.json,
        });
        io.emit('update', {
            name: Employee.schema.name,
            data: this.employee.json,
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

MembershipCard.permission = {
    user: [],
    employee: ['read', 'create', 'update'],
};

export default MembershipCard;
