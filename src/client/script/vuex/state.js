export default {
    app: {
        name: 'Tiệm sách thông minh',
        address: 'Khu phố 6, Phường Linh Trung, Quận Thủ Đức, Thành phố Hồ Chí Minh',
        phone: '(028) 372 51993',
    },
    user: {
        id: '517599748348537',
        name: 'Phạm Hồng Phúc',
    },
    gui: {
        fullSideBarSize: true,
    },
    data: {
        books: [],
        employees: [],
    },
    pos: {
        sells: [],
    },
    markdown: {
        admin_book_add: require('./markdown/admin-book-add.md'),
    },
};
