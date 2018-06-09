import getDOM from './getDOM';
import getHTML from './getHTML';

/**
 *
 * @param {String} url
 */
export default async function(url) {
    const body = await getHTML(url);
    const $ = getDOM(body);
    const data = [];

    $('[data-id]').each((index, element) => data.push($(element).attr('data-id')));
    return data;
}
