/**
 * @param {String} accessToken
 */
export async function getUserInfo(accessToken) {
    return new Promise((resolve, reject) => {
        resolve({
            id: 123,
            name: 'tocdep',
        });
    });
}
