import getDOM from './src/getDOM';
import getHTML from './src/getHTML';

/**
 *
 * @param {String} url
 */
export default async function(url) {
    const body = await getHTML(url);
    const $ = getDOM(body);
    const data = [];

    $('[data-id]').each((index, element) =>
        data.push($(element).attr('data-id')),
    );
    return data;
}
