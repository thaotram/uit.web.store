/**
 * @typedef {import('./interface').Update} Update
 */
import Models from './Models';
import { Employee, User, Book, Supplier } from '../../database/database';

/**
 * @param {Update} update
 * @param {string} sessionID
 * @return {Update}
 */
export default function standardizeUpdate(update, sessionID) {
    if (typeof update._ !== 'string') throw `{read.model} phải là chuỗi: ${update._}`;

    const Model = Models.find(m => m.schema.name === update._);
    if (!Model) throw `Không có kiểu đối tượng: ${update._}`;
    update.model = Model;

    update.authorize = User.getBySessionId(sessionID);
    if (!update.authorize) throw 'Không tìm thấy phiên đăng nhập';

    if (update.hasOwnProperty('employeeId')) {
        update.employee = Employee.getById(update.employeeId);
    }

    if (update.hasOwnProperty('userId')) {
        update.user = User.getById(update.userId);
    }

    if (update.hasOwnProperty('bookId')) {
        update.book = Book.getById(update.bookId);
    }

    if (update.hasOwnProperty('supplierId')) {
        update.supplier = Supplier.getById(update.supplierId);
    }

    return update;
}
