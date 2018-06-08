import User from '../../model/User';
import Employee from '../../model/Employee';

/**
 *
 * @param {Realm} realm
 * @param {Employee} rawEmployee
 */
export default async function(realm, user, rawEmployee) {
    return new Promise((resolve, reject) => {
        if (!User.isValid(realm, user)) {
            reject(`User doesn't exist`);
            return;
        }
        if (
            realm
                .objects('Employee')
                .filtered(`user.id == ${user.id}`)[0] !==
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
