import createApi from './create.api';
import readApi from './read.api';

/**
 * 
 * @param {Express.Application} app 
 * @param {SocketIO.Server} io
 * @param {*} realm 
 */
export default function(app, io, realm) {
    createApi(app, io, realm);
    readApi(app, io, realm);
}
