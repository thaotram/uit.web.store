import Model from '../utils/Model';
import { Book } from '../database';

class ImportCouponDetail extends Model {
    static isRawValid(realm, importCouponDetails) {
        if (!Array.isArray(importCouponDetails)) throw 'Danh sách chi tiết phiếu nhập phải là một mảng';

        return importCouponDetails.every(detail => {
            if (typeof detail != 'object') throw 'Chi tiết phiếu nhập phải là kiểu đối tượng';
            if (
                !detail.hasOwnProperty('bookId') ||
                !detail.hasOwnProperty('amount') ||
                !detail.hasOwnProperty('price')
            ) {
                throw 'Không có trường dữ liệu bookId, amount hoặc price';
            }
            if (
                typeof detail.bookId != 'number' ||
                typeof detail.amount != 'number' ||
                typeof detail.price != 'number'
            ) {
                throw 'Cả bookId, amount, price phải là kiểu số';
            }
            if (Book.getById(realm, detail.bookId) == undefined) {
                throw 'BookId không tồn tại';
            }
            if (detail.amount <= 0) throw 'Amount phải > 0';
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
        amount: 'int',
        price: 'int',
    },
};

export default ImportCouponDetail;
