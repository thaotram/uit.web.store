import { socket } from '../../socket/socket';

/**
 * @param {{_: Model, return: string, details: Object[]}} data
 */
export async function create(data) {
    return await fetch('/api/create', {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    });
}

/**
 * @param {{_: Model, return: string, details: Object[]}} req
 */
export async function read(req) {
    return await new Promise((reject, resolve) => {
        socket.emit('api/read', req, async res => resolve(res));
    });
}
