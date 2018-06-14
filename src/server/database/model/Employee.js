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

    get json() {
        const o = this.object;
        o.userId = this.user.id;
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
