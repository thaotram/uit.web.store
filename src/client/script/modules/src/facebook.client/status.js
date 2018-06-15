import Facebook from './index';

/**
 * @param {SocketIOClient.Socket} socket
 * @return {Promise<{isLogin: Boolean, res?: {id: Number, name: String, employeeId: Number}}>}
 */
export default function(socket) {
    return new Promise(resolve => {
        console.log(Facebook);
        Facebook.default.FB.getLoginStatus(response => {
            if (response.status === 'connected') {
                const req = {
                    token: response.authResponse.accessToken,
                    id: Number(response.authResponse.userID),
                };
                socket.emit('login', req, res => resolve({ isLogin: !res.error, res }));
            } else {
                resolve({ isLogin: false });
            }
        });
    });
}
