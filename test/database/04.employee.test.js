import { assert } from 'chai';
import { filename, itname } from '../utils/utils';
import database, { Employee } from '../../src/server/database/database';

describe(filename(__filename), function() {
    this.timeout(1000000);

    it(itname('Employee.create()', 'Thêm nhân viên'), async function() {
        const realm = await database();
        const user = realm.objects('User')[0];
        const rawEmployee = {
            name: 'Ng V C',
            birthdate: new Date(2000, 2, 3),
            address: '1-62 Lê Lợi, Q.1, TP. HCM',
            phone: '1900646467',
        };
        try {
            const employee = await Employee.create(realm, user, rawEmployee);
            assert.isTrue(employee instanceof Employee);
            assert.equal(employee.name, rawEmployee.name);
        } catch (e) {
            assert.equal(e, 'Employee is exist');
        }
    });
});
