/**
 * @typedef {import('./interface').Create} Create
 */
import Models from './Models';
import { Employee, User, Book, Supplier } from '../../database/database';

/**
 * @param {Create} create
 * @param {string} sessionID
 * @return {Create}
 */
export default function standardizeCreate(create, sessionID) {
    if (typeof create._ !== 'string') throw `{read.model} phải là chuỗi: ${create._}`;

    const Model = Models.find(m => m.schema.name === create._);
    if (!Model) throw `Không có kiểu đối tượng: ${create._}`;
    create.model = Model;

    create.authorize = User.getBySessionId(sessionID);
    if (!create.authorize) throw 'Không tìm thấy phiên đăng nhập';

    if (create.hasOwnProperty('employeeId')) {
        create.employee = Employee.getById(create.employeeId);
    }

    if (create.hasOwnProperty('userId')) {
        create.user = User.getById(create.userId);
    }

    if (create.hasOwnProperty('bookId')) {
        create.book = Book.getById(create.bookId);
    }

    if (create.hasOwnProperty('supplierId')) {
        create.supplier = Supplier.getById(create.supplierId);
    }

    return create;
}
