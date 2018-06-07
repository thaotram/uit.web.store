import getBookIds from './getBookIds';
import getRawBook from './getRawBook';
import writeDataFromRaw from './writeDataFromRaw';

export default async function(realm, url) {
    const bookIds = (await getBookIds(url)).slice(0,5);
    console.log(bookIds.length);

    const calls = bookIds.map(async bookId => {
        console.log(bookId);
        const rawBook = await getRawBook(bookId);
        await writeDataFromRaw(realm, rawBook);
    });
    console.log('aye');
    return await Promise.all(calls);
}
