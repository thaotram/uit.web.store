import fb from 'fb';
fb.options({ version: 'v3.0' });

/**
 * <key: value>: <sessionId: userId>
 */
const sessionStore = {};

/**
 * @param {String} access_token
 */
export async function getUserInfo(access_token) {
    try {
        return await fb.api('me', {
            fields: ['id', 'name'],
            access_token,
        });
    } catch (e) {
        return null;
    }
}

/**
 * @param {Object} req
 * @param {String} sessionID
 * @returns {Number}
 */
export function getUserFromSessionID(req, sessionId) {
    const userFromSession = sessionStore[sessionId];
    if (!userFromSession) return;

    if (req.id === userFromSession.id) return userFromSession;

    delete sessionStore[sessionId];
    return;
}

/**
 *
 * @param {User} user
 * @param {string} sessionID
 */
export function setUserSession(user, sessionID) {
    sessionStore[sessionID] = user;
}
