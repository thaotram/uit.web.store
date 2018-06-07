import request from 'request';
import getDOM from './src/getDOM';
import each from './each';

/**
 *
 * @param {String} url
 */
export default function(url, callback = () => {}) {
    console.log(url);
    request(url, (error, response, body) => {
        const data = [];
        if (!error && response.statusCode == 200) {
            const $ = getDOM(body);
            $('[data-id]').each((i, e) =>
                data.push($(e).attr('data-id')),
            );
            console.log(data);
            data.forEach(element => {
                each(element, callback);
            });
        } else {
            console.log(error);
        }
    });
}
