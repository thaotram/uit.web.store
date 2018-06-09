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
        return new Promise((resolve, reject) => {
            if (!User.isValid(realm, user)) {
                reject(`User doesn't exist`);
                return;
            }
            if (
                realm.objects('Employee').filtered(`user.id == ${user.id}`)[0] !==
                undefined
            ) {
                reject(`Employee is exist`);
                return;
            }
            if (!Employee.isRawValid(rawEmployee)) {
                reject('Information Error');
                return;
            }
            realm.write(() => {
                resolve(
                    realm.create(
                        'Employee',
                        {
                            id: Employee.getNextId(realm),
                            user: user,
                            name: rawEmployee.name,
                            birthdate: rawEmployee.birthdate,
                            address: rawEmployee.address,
                            phone: rawEmployee.phone,
                            startDate: new Date(),
                        },
                        true,
                    ),
                );
            });
        });
    }
}

Employee.schema = {
    name: 'Employee',
    primaryKey: 'id',

    properties: {
        id: 'int',
        user: 'User', // nhân viên là 1 user

        name: 'string',
        birthdate: 'date',
        address: 'string',
        phone: 'string',
        startDate: 'date',
        // salary: 'int', //TODO: xóa trong ERD, CSDL

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
