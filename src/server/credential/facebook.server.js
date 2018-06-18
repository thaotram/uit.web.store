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
 * @param {{id: number}} req
 * @param {String} sessionID
 * @returns {User | undefined}
 */
export function getUserByRequestAndSessionID(req, sessionId) {
    const userFromSession = sessionStore[sessionId];
    if (!userFromSession) return;

    if (req.id === userFromSession.id) return userFromSession;

    delete sessionStore[sessionId];
    return;
}

/**
 * @param {String} sessionID
 * @returns {User | undefined}
 */
export function getUserBySessionID(sessionId) {
    return sessionStore[sessionId];
}

/**
 *
 * @param {User} user
 * @param {string} sessionID
 */
export function setUserSession(user, sessionID) {
    sessionStore[sessionID] = user;
}
