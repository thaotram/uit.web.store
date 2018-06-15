export default {
    /**
     * @param {typeof import("../state").default} state
     */
    order_coupon_add_order_book(state, book) {
        if (state.order_coupon.orders.some(self => self.book === book)) return;
        state.order_coupon.orders.push({
            book,
            count: 1,
            price: book.coverPrice,
        });
    },

    /**
     * @param {typeof import("../state").default} state
     */
    order_coupon_remove_order_book(state, importBook) {
        const index = state.order_coupon.orders.indexOf(importBook);
        if (index === -1) return;
        state.order_coupon.orders.splice(index, 1);
    },

    /**
     * @param {typeof import("../state").default} state
     */
    order_coupon_remove_order_books(state) {
        state.order_coupon.orders = [];
    },
};
