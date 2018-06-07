import request from 'request';
import tiki from './src/tiki';

export default function(id, callback = () => {}) {
    const url = `https://tiki.vn/p${id}.html`;
    request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const data = tiki(id, body);
            try {
                callback(data);
            } catch (e) {
                console.log('Lỗi tại quyển:', id, e);
            }
        } else console.log(error);
    });
}
