import {
    isAddressValid,
    isBirthdateValid,
    isNameValid,
    isPhoneValid,
} from '../utils/Validation';
import { db, User } from '../database';
import Model from '../utils/Model';
import moment from 'moment';
import MembershipCard from './MembershipCard';

class Employee extends Model {
    /**
     * @param {Employee} employee
     */
    static isRawValid(employee) {
        isNameValid(employee.name);
        isAddressValid(employee.address);
        isPhoneValid(employee.phone);
        isBirthdateValid(employee.birthdate);
    }

    /**
     *
     * @param {String} sessionId
     * @returns {Employee}
     */
    static getBySessionId(sessionId) {
        const user = User.getBySessionId(sessionId);
        if (!user) throw 'Không tìm thấy phiên đăng nhập';
        if (!user.employee[0]) throw 'Không phải là phiên đăng nhập của nhân viên';

        return user.employee[0];
    }

    /**
     * @param {import('../../socket/utils/interface').Create} create
     */
    static async create(create) {
        if (!User.has(create.user)) {
            throw `Người dùng không tồn tại`;
        }
        if (Employee.list.filtered(`user.id == ${create.user.id}`)[0] !== undefined) {
            throw `Nhân viên đã tồn tại`;
        }
        Employee.isRawValid(create);

        return await Employee.write({
            id: Employee.nextId,
            user: create.user,
            name: create.name,
            birthdate: moment(create.birthdate, 'DD-MM-YYYY').toDate(),
            address: create.address,
            phone: create.phone,
            startDate: new Date(),
        });
    }

    /**
     * @param {import('../../socket/utils/interface').Update} update
     */
    async update(update) {
        await db.realm.write(() => {
            if (update.hasOwnProperty('name')) {
                isNameValid(update.name);
                this.name = update.name;
            }
            if (update.hasOwnProperty('birthdate')) {
                const birthdate = moment(update.birthdate, 'DD-MM-YYYY').toDate();
                isBirthdateValid(birthdate);
                this.birthdate = birthdate;
            }
            if (update.hasOwnProperty('address')) {
                isAddressValid(update.address);
                this.address = update.address;
            }
            if (update.hasOwnProperty('phone')) {
                isPhoneValid(update.phone);
                this.phone = update.phone;
            }
        });
    }

    get history() {
        return {
            history: {
                exportBills: this.exportBills.map(e => e.json),
                orderCoupons: this.orderCoupons.map(e => e.json),
                importCoupons: this.importCoupons.map(e => e.json),
                paymentCoupons: this.paymentCoupons.map(e => e.json),
                membershipCards: this.membershipCards.map(e => e.json),
            },
        };
    }

    get json() {
        const o = this.object;
        o.userId = this.user.id;
        o.birthdate = moment(this.birthdate).format('DD-MM-YYYY');
        return o;
    }

    notification(io) {
        io.emit('push', {
            name: Employee.schema.name,
            data: this.json,
        });
        io.emit('push', {
            name: User.schema.name,
            data: this.user.json,
        });
    }
}

Employee.schema = {
    name: 'Employee',
    primaryKey: 'id',

    properties: {
        id: 'int',
        user: 'User',

        name: 'string',
        birthdate: 'date',
        address: 'string',
        phone: 'string',
        startDate: 'date',

        membershipCards: {
            type: 'linkingObjects',
            objectType: 'MembershipCard',
            property: 'employee',
        },
        exportBills: {
            type: 'linkingObjects',
            objectType: 'ExportBill',
            property: 'employee',
        },
        orderCoupons: {
            type: 'linkingObjects',
            objectType: 'OrderCoupon',
            property: 'employee',
        },
        importCoupons: {
            type: 'linkingObjects',
            objectType: 'ImportCoupon',
            property: 'employee',
        },
        paymentCoupons: {
            type: 'linkingObjects',
            objectType: 'PaymentCoupon',
            property: 'employee',
        },
    },
};

Employee.permission = {
    user: [],
    employee: ['read', 'create', 'update'],
};

export default Employee;
