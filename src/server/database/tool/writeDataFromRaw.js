import Price from '../../database/model/Price';

/**
 *
 * @param {Realm} realm
 * @param {getRawBook} book
 */
export default async function(realm, rawBook) {
    return new Promise(resolve => {
        realm.write(() => {
            const book = realm.create(
                'Book',
                rawBook.book,
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
                lastPrice.price !== rawBook.price
            ) {
                realm.create('Price', {
                    id: Price.getNextId(realm),
                    time: new Date(),
                    price: rawBook.price,
                    book: book,
                });
            }
            resolve(book);
        });
    });
}
