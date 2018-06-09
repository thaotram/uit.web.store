import { assert } from 'chai';
import { getList, getRawBook } from '../../src/server/database/tiki';
import { filename, itname } from '../utils/utils';

describe(filename(__filename), function() {
    this.timeout(1000000);

    it(itname('[getList(url)]', 'Lấy danh mục sách'), async function() {
        const url = 'https://tiki.vn/nha-sach-tiki/c8322';
        const data = await getList(url);

        assert.isArray(data, `Phải trả về một mảng`);
        assert.isTrue(data.length > 0, `Phải trả về một mảng có nhiều hơn 0 phần tử`);
    });

    it(itname('[getRawBook(id)]', 'Thông tin một quyển sách'), async function() {
        const id = '580112';
        const name = 'Harry Potter Và Hòn Đá Phù Thủy - Tập 1 (Tái Bản 2017)';
        const book = await getRawBook(id);

        assert.isObject(book, 'Phải trả về một đối tượng');
        assert.equal(book.book.name, name, `Thông tin sách lấy được từ ${book.url} phải có tên là: ${name}`);
    });
});
