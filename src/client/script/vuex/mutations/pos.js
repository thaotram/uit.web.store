export default {
    /**
     * @param {typeof import("../state").default} state
     */
    pos_add_book(state, book) {
        if (state.pos.books.some(self => self.book === book)) return;
        state.pos.books.push({
            book,
            amount: 1,
        });
    },

    /**
     * @param {typeof import("../state").default} state
     */
    pos_load_books(state, books) {
        state.data.books = books;
    },

    /**
     * @param {typeof import("../state").default} state
     */
    pos_remove_book(state, sell) {
        // console.log(sell);
        const index = state.pos.books.indexOf(sell);
        if (index === -1) return;
        state.pos.books.splice(index, 1);
    },
};
