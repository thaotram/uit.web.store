import fb from 'fb';
/**
 * @param {String} accessToken
 */
export async function getUserInfo(accessToken) {
    try {
        return await fb.api('me', {
            fields: ['id', 'name'],
            access_token: accessToken,
        });
    } catch (e) {
        return {
            error: e,
        };
    }
}
