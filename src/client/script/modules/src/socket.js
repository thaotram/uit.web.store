import { socket } from '../../socket/socket';

/**
 * @param {{_: Model, return: string, details: Object[]}} req
 */
export async function create(req) {
    return await new Promise(resolve => {
        socket.emit('api/create', req, async res => resolve(res));
    });
}

/**
 * @param {{_: Model, return: string, details: Object[]}} req
 */
export async function read(req) {
    return await new Promise(resolve => {
        socket.emit('api/read', req, async res => resolve(res));
    });
}
