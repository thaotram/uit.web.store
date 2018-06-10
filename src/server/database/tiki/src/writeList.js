import Promise from 'bluebird';
import { Book } from '../../database';
import getList from './getList';
import getRawBook from './getRawBook';
import readline from 'readline';

export default async function(realm, url) {
    const bookIds = await getList(url);

    let count = 0;
    log(count, bookIds.length);
    return await Promise.map(
        bookIds,
        async bookId => {
            const rawBook = await getRawBook(bookId);
            await Book.create(realm, rawBook);
            log(++count, bookIds.length);
        },
        {
            concurrency: 4,
        },
    ).finally(() => {
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
    });
}

function log(a, b) {
    const max = 50;
    const char = '▓';
    const length = b > max ? max : b;

    const start = Math.round((a / b) * length);
    const loading = ''.padStart(start, char).padEnd(length, '░');

    process.stdout.write(`\r ${loading} : ${a} / ${b} `);
}
