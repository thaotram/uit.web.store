import Realm from 'realm';
import {
    isNameValid,
    isAddressValid,
    isPhoneValid,
    isBirthdateValid,
} from '../business/Utils';

class Employee {
    static getNextId(realm) {
        const items = realm.objects('Employee');
        return items.length == 0 ? 1 : items.max('id') + 1;
    }
    static isValid(realm, employee) {
        if (!employee) {
            return false;
        }
        return (
            realm
                .objects('Employee')
                .filtered(`id == ${employee.id}`)[0] !==
            undefined
        );
    }
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
