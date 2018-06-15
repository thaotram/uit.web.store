export { money, english } from './src/string';
export { timeAgo, date } from './src/time';

export { default as facebookInitialize, avatar } from './src/facebook.client';
export { found } from './src/string';

export default {
    /**
     * @returns {FB}
     */
    get FB() {
        if (window.FB) return window.FB;
        else throw 'Không thể lấy đối tượng FB khi nó chưa được khởi tạo';
    },
};
