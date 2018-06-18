/**
 * @typedef {import('./interface').Read} Read
 */
import Models from './Models';
import { Employee } from '../../../database/database';

/**
 * @param {Read} read
 * @param {string} sessionID
 * @return {Read}
 */
export default function standardizeRead(read, sessionID) {
    if (typeof read._ !== 'string') throw `{read._} phải là chuỗi: ${read._}`;

    const Model = Models.find(m => m.schema.name === read._);
    if (!Model) throw `Không có kiểu đối tượng: ${read._}`;
    read.model = Model;

    read.employee = Employee.getBySessionId(sessionID);

    read.operators = read.operators || {};
    read.return = read.return || 'json';
    read.max = read.max || 20;
    read.page = read.page || 1;
    return read;
}
