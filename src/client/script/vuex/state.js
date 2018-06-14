export default {
    app: {
        name: 'Tiệm sách thông minh',
        address: 'Khu phố 6, Phường Linh Trung, Quận Thủ Đức, Thành phố Hồ Chí Minh',
        phone: '(028) 372 51993',
    },
    user: {
        id: 715380908507851,
        name: 'Lê Thị Thảo Trâm',
    },
    gui: {
        fullSideBarSize: true,
    },
    data: {
        books: [],
        employees: [],
        users: [],
    },
    pos: {
        sells: [],
    },
    markdown: {
        admin_book_add: require('./markdown/admin-book-add.md'),
        admin_user: require('./markdown/admin-user.md'),
    },
};
