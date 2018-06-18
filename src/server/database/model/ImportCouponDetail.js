import Model from '../utils/Model';
import { Book } from '../database';

class ImportCouponDetail extends Model {
    static isRawValid(importCouponDetails) {
        if (!Array.isArray(importCouponDetails))
            throw 'Danh sách chi tiết phiếu nhập phải là một mảng';

        return importCouponDetails.every(detail => {
            if (typeof detail != 'object')
                throw 'Chi tiết phiếu nhập phải là kiểu đối tượng';
            if (
                !detail.hasOwnProperty('bookId') ||
                !detail.hasOwnProperty('count') ||
                !detail.hasOwnProperty('price')
            ) {
                throw 'Không có trường dữ liệu bookId, count hoặc price';
            }
            if (
                typeof detail.bookId != 'number' ||
                typeof detail.count != 'number' ||
                typeof detail.price != 'number'
            ) {
                throw 'Cả bookId, count, price phải là kiểu số';
            }
            if (Book.getById(detail.bookId) == undefined) {
                throw 'BookId không tồn tại';
            }
            if (detail.count <= 0) throw 'Count phải > 0';
            if (detail.price <= 0) throw 'Price phải > 0';
        });
    }
    get json() {
        const o = this.object;
        o.bookId = this.book.id;
        return o;
    }
}

ImportCouponDetail.schema = {
    name: 'ImportCouponDetail',
    primaryKey: 'id',

    properties: {
        id: 'int',
        importCoupon: 'ImportCoupon',
        book: 'Book',
        count: 'int',
        price: 'int',
    },
};

ImportCouponDetail.permission = {
    user: [],
    employee: [],
};

export default ImportCouponDetail;
