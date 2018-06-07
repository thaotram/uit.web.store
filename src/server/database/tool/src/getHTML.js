import request from 'request';
// import tiki from './src/tiki';
// const url = `https://tiki.vn/p${id}.html`;

export default async function(url) {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                resolve(body);
            } else {
                reject(`Không thể truy cập đường dẫn ${url}`);
            }
        });
    });
}
