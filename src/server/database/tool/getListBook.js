import getDOM from './src/getDOM';
import getHTML from './src/getHTML';

/**
 *
 * @param {String} url
 */
export default async function(url) {
    const body = await getHTML(url);
    const $ = getDOM(body);
    return Array.from(
        $('[data-id]').map((index, element) =>
            $(element).attr('data-id'),
        ),
    );
}
