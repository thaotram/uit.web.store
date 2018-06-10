import {
    isAddressValid,
    isBirthdateValid,
    isNameValid,
    isPhoneValid,
} from '../utils/Validation';
import { User } from '../database';
import Model from '../utils/Model';

class Employee extends Model {
    /**
     * @param {Employee} employee
     */
    static isRawValid(employee) {
        if (
            !isNameValid(employee.name) ||
            !isAddressValid(employee.address) ||
            !isPhoneValid(employee.phone) ||
            !isBirthdateValid(employee.birthdate)
        )
            return false;
        return true;
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
        if (!Employee.isRawValid(rawEmployee)) {
            throw 'Information Error';
        }
        return await Employee.write(realm, true, {
            id: Employee.getNextId(realm),
            user: user,
            name: rawEmployee.name,
            birthdate: rawEmployee.birthdate,
            address: rawEmployee.address,
            phone: rawEmployee.phone,
            startDate: new Date(),
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

export default Employee;
