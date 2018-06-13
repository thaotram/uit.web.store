export default {
    /**
     * @param {typeof import("../state").default} state
     */
    pos_add_sell_book(state, book) {
        if (state.pos.sells.some(self => self.book === book)) return;
        state.pos.sells.push({
            book,
            amount: 1,
        });
    },

    /**
     * @param {typeof import("../state").default} state
     */
    pos_remove_sell_book(state, sell) {
        // console.log(sell);
        const index = state.pos.sells.indexOf(sell);
        if (index === -1) return;
        state.pos.sells.splice(index, 1);
    },

    /**
     * @param {typeof import("../state").default} state
     */
    pos_remove_sell_books(state) {
        state.pos.sells = [];
    },
};
