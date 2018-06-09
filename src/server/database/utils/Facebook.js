import fb from 'fb';
/**
 * @param {String} accessToken
 */
export async function getUserInfo(accessToken) {
    return await fb.api('me', {
        fields: ['id', 'name'],
        access_token: accessToken,
    });
}
