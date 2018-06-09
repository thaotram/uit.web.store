import got from 'got';

/**
 * @param {String} url `https://tiki.vn/p${id}.html`
 */
export default async function(url) {
    const res = await got(url);
    if (res.statusCode !== 200) throw `Không thể truy cập đường dẫn: ${url}`;
    return res.body;
}
