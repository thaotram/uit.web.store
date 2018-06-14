import moment from 'moment';

/**
 *
 * @param {String} string hh:mm:ss DD-MM-YYYY
 */
export default function toDate(string) {
    return moment(string, 'hh:mm:ss DD-MM-YYYY').format('DD-MM-YYYY');
}
