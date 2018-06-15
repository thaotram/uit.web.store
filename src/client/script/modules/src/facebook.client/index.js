import initialize from './initialize';
import status from './status';

class Facebook {
    /**
     * @returns {FB}
     */
    static get FB() {
        if (window.FB) return window.FB;
        else throw 'Không thể lấy đối tượng FB khi nó chưa được khởi tạo';
    }

    static initialize = initialize;
    static status = status;
}

export default Facebook;
