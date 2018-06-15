import moment from 'moment';

const format = 'hh:mm:ss DD-MM-YYYY';

moment.locale('vi');

/**
 *
 * @param {Date} date
 */
export function timeAgo(date) {
    return moment(date, format).fromNow();
}

/**
 * @param {String} string hh:mm:ss DD-MM-YYYY
 */
export function date(string) {
    return moment(string, format).format('DD-MM-YYYY');
}
