import Realm from 'realm';
import User from '../model/User';

/**
 *
 * @param {Realm} realm
 * @param {Supplier} supplier
 */
export default async function(realm, accessToken) {
    return new Promise((resolve, reject) => {
        getUserInfo(accessToken)
            .then(info => {
                realm.write(() => {
                    resolve(
                        realm.create(
                            'User',
                            {
                                id: info.id,
                                name: info.name,
                                point: 0,
                            },
                            true,
                        ),
                    );
                });
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function getUserInfo(accessToken) {
    return new Promise((resolve, reject) => {
        resolve({
            id: 123,
            name: 'tocdep',
        });
    });
}
