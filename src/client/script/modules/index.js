export { avatar, default as facebookInitialize } from './src/facebook.client';
export { employee, supplier, user } from './src/fetch';
export { english, found, money } from './src/string';
export { date, timeAgo } from './src/time';

export default {
    /**
     * @returns {FB}
     */
    get FB() {
        if (window.FB) return window.FB;
        else throw 'Không thể lấy đối tượng FB khi nó chưa được khởi tạo';
    },
};
