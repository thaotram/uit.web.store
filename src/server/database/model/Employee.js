import {
    isAddressValid,
    isBirthdateValid,
    isNameValid,
    isPhoneValid,
} from '../utils/Validation';
import { User } from '../database';
import Model from '../utils/Model';
import moment from 'moment';

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
     * @param {Realm} realm
     * @param {Employee} rawEmployee
     */
    static async create(realm, user, rawEmployee) {
        if (!User.has(realm, user)) {
            throw `User doesn't exist`;
        }
        if (
            realm.objects('Employee').filtered(`user.id == ${user.id}`)[0] !== undefined
        ) {
            throw `Employee is exist`;
        }
        Employee.isRawValid(rawEmployee);

        return await Employee.write(realm, true, {
            id: Employee.getNextId(realm),
            user: user,
            name: rawEmployee.name,
            birthdate: moment(rawEmployee.birthdate, 'DD-MM-YYYY').toDate(),
            address: rawEmployee.address,
            phone: rawEmployee.phone,
            startDate: new Date(),
        });
    }

    /**
     *
     * @param {Realm} realm
     * @param {Object} data
     */
    async update(realm, data) {
        await realm.write(() => {
            if (data.hasOwnProperty('name')) {
                isNameValid(data.name);
                this.name = data.name;
            }
            if (data.hasOwnProperty('birthdate')) {
                const birthdate = moment(data.birthdate, 'DD-MM-YYYY').toDate();
                isBirthdateValid(birthdate);
                this.birthdate = birthdate;
            }
            if (data.hasOwnProperty('address')) {
                isAddressValid(data.address);
                this.address = data.address;
            }
            if (data.hasOwnProperty('phone')) {
                isPhoneValid(data.phone);
                this.phone = data.phone;
            }
        });
    }

    get json() {
        const o = this.object;
        o.userId = this.user.id;
        o.birthdate = moment(this.birthdate).format('DD-MM-YYYY');
        return o;
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

export default Employee;
