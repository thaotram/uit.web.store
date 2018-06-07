import toMarkdown from './src/toMarkdown';
import getDOM from './src/getDOM';
import getHTML from './src/getHTML';
import moment from 'moment';

/**
 * @param {String} body
 */
export default async function(id) {
    const url = `https://tiki.vn/p${id}.html`;
    const body = await getHTML(url);
    const $ = getDOM(body);
    return {
        book: {
            id: parseInt(id),
            name: $('#product-name')
                .text()
                .trim(),
            author: get($, 'author'),
            sku: get($, 'sku'),
            coverPrice: parseInt(
                $('#span-list-price')
                    .text()
                    .replace(/[^0-9]/, ''),
            ),
            publisher: get($, 'publisher_vn'),
            manufacturer: get($, 'manufacturer_book_vn'),
            dimensions: get($, 'dimensions'),
            numberOfPage: getNumberOfPage($),
            publicationDate: moment(
                get($, 'publication_date'),
                'MM-YYYY',
            ).toDate(),
            bookCover: get($, 'book_cover'),
            description: toMarkdown(
                $('#gioi-thieu').html(),
            ),
            image: getImage(body),

            category: [],
        },
        url,
        price: parseInt(
            $('#span-price')
                .text()
                .replace(/[^0-9]/, ''),
        ),
    };
}

function get($, id) {
    return $(`td[rel=${id}]+td`)
        .text()
        .trim()
        .replace(/\s\s/g, '');
}

function getImage(body) {
    return body
        .replace(/[^]+"large_url":"([^"]+)"[^]+/g, '$1')
        .replace(/\\/g, '');
}

function getNumberOfPage($) {
    let num = parseInt(get($, 'number_of_page'));
    if (isNaN(num)) {
        num = -1;
    }
    return num;
}
