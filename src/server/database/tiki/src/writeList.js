import Promise from 'bluebird';
import { Book } from '../../database';
import getList from './getList';
import getRawBook from './getRawBook';
import readline from 'readline';

/**
 *
 * @param {Realm} realm
 * @param {String} url
 * @param {SocketIO.Server} io
 */
export default async function(url, io) {
    const bookIds = await getList(url);

    let count = 0;
    log(count, bookIds.length);
    return await Promise.map(
        bookIds,
        async bookId => {
            const rawBook = await getRawBook(bookId);
            await Book.create(rawBook);
            log(++count, bookIds.length, io);
        },
        {
            concurrency: 4,
        },
    )
        .catch(e => {
            console.log(e);
        })
        .finally(() => {
            readline.clearLine(process.stdout, 0);
            readline.cursorTo(process.stdout, 0);
            if (io) io.emit('update', 'book');
        });
}

function log(a, b, io) {
    const max = 50;
    const char = '▓';
    const length = b > max ? max : b;

    const start = Math.round((a / b) * length);
    const loading = ''.padStart(start, char).padEnd(length, '░');

    if (io) io.emit('update_book', `${loading} : ${a} / ${b}`);
    process.stdout.write(`\r ${loading} : ${a} / ${b} `);
}
