export { default as toEnglish } from './src/toEnglish';
export { default as toMoney } from './src/toMoney';
export { default as toDate } from './src/toDate';
export { default as found } from './src/found';
export { default as facebookInitialize } from './src/facebook.client';

export default {
    /**
     * @returns {FB}
     */
    get FB() {
        if (window.FB) return window.FB;
        else throw 'Không thể lấy đối tượng FB khi nó chưa được khởi tạo';
    },
};
