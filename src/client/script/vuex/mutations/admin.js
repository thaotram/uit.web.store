export default {
    /**
     * @param {typeof import("../state").default} state
     */
    load_books(state, books) {
        state.data.books = books;
    },
};