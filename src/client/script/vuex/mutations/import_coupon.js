export default {
    /**
     * @param {typeof import("../state").default} state
     */
    import_coupon_add_buy_book(state, book) {
        if (state.import_coupon.buys.some(self => self.book === book)) return;
        state.import_coupon.buys.push({
            book,
            count: 1,
            price: book.coverPrice,
        });
    },

    /**
     * @param {typeof import("../state").default} state
     */
    import_coupon_remove_buy_book(state, importBook) {
        const index = state.import_coupon.buys.indexOf(importBook);
        if (index === -1) return;
        state.import_coupon.buys.splice(index, 1);
    },

    /**
     * @param {typeof import("../state").default} state
     */
    import_coupon_remove_buy_books(state) {
        state.import_coupon.buys = [];
    },
};
