import moment from 'moment';

export function isNameValid(name) {
    if (typeof name !== 'string') throw 'Tên phải là chuỗi';
    if (name.length <= 3) throw 'Tên phải có nhiều hơn 3 kí tự';
}

export function isBirthdateValid(birthdate) {
    if(!moment(birthdate, 'DD-MM-YYYY').isValid()) throw 'Thời gian không đúng định dạng (DD-MM-YYYY)';
}

export function isAddressValid(address) {
    if (typeof address !== 'string') throw 'Địa chỉ phải là chuỗi';
    if (address.length <= 5) throw 'Địa chỉ phải có nhiều hơn 5 kí tự';
}

export function isPhoneValid(phone) {
    if (typeof phone !== 'string') throw 'Số điện thoại phải là chuỗi';
    const regexpPhone = /^[+]?[(]?[0-9]{3}[)]?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4,6}$/i;
    if (!phone.match(regexpPhone)) throw 'Số điện thoại không đúng định dạng';
}

export function isContentValid(content) {
    if (typeof content !== 'string') throw 'Nội dung phải là chuỗi';
    if (content.length <= 3) throw 'Nội dung phải có nhiều hơn 3 kí tự';
}

export function isMoney(money) {
    if (typeof money !== 'number') throw 'Tiền phải là số';
    if (money <= 0) throw 'Số tiền phải > 0';
}
