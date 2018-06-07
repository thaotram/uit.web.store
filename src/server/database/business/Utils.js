import moment from 'moment';

export function isNameValid(name) {
    if (typeof name !== 'string') return false;
    if (name.length <= 3) return false;
    return true;
}
export function isBirthdateValid(birthdate) {
    return moment(birthdate, 'DD-MM-YYYY').isValid();
}
export function isAddressValid(address) {
    if (typeof address !== 'string') return false;
    if (address.length <= 10) return false;
    return true;
}
export function isPhoneValid(phone) {
    if (typeof phone !== 'string') return false;
    const regexpPhone = /^[+]?[(]?[0-9]{3}[)]?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4,6}$/i;
    if (!phone.match(regexpPhone)) return false;
    return true;
}
export function isPaidContentValid(paidContent) {
    if(typeof paidContent !== 'string') return false;
    if(paidContent.length <= 3) return false;
    return true;
}
export function isMoney(money){
    if(typeof money !== 'number') return false;
    if(money <= 0) return false;
    return true;
}
