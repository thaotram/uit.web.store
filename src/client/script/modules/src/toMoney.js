const NumberFormat = new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' });
/**
 *
 * @param {Number} number
 */
export default function(number) {
    return NumberFormat.format(number);
}
