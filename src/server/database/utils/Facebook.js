import fb from 'fb';
fb.options({ version: 'v3.0' });
/**
 * @param {String} accessToken
 */
export function getUserInfo(accessToken) {
    return fb.api('me', {
        fields: ['id', 'name'],
        access_token: accessToken,
    });
}
