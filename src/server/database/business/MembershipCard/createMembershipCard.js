import User from '../../model/User';
import Employee from '../../model/Employee';
import MembershipCard from '../../model/MembershipCard';

/**
 *
 * @param {Realm} realm
 * @param {User} user
 * @param {Employee} employee
 */
export default async function(realm, user, employee) {
    return new Promise((resolve, reject) => {
        if (
            !User.isValid(realm, user) ||
            !Employee.isValid(realm, employee)
        ) {
            reject(`User or employee doesn't exist`);
            return;
        }
        if (user.billOwns.length === 0) {
            reject('Dont Create');
            return;
        }
        realm.write(() => {
            resolve(
                realm.create(
                    'MembershipCard',
                    {
                        id: MembershipCard.getNextId(realm),
                        owner: user,
                        employee: employee,
                        create: new Date(),
                        valid: true,
                    },
                    true,
                ),
            );
        });
    });
}
