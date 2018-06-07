import list from './list';
import Price from '../../database/model/Price';

export default function LoadBookFromTiki(app) {
    const realm = app.realm;
    const url =
        'https://tiki.vn/bestsellers-month/nha-sach-tiki/c8322?p=2';
    list(url, data => {
        console.log(data.book.name);
        realm.write(() => {
            const book = realm.create(
                'Book',
                data.book,
                true,
            );

            const lastPrice = realm
                .objects('Price')
                .filtered(
                    `book.id == ${
                        book.id
                    } SORT (time DESCENDING)`,
                )[0];

            if (
                !lastPrice ||
                lastPrice.price !== data.price
            ) {
                realm.create('Price', {
                    id: Price.getNextId(realm),
                    time: new Date(),
                    price: data.price,
                    book: book,
                });
            }
        });
    });
}
