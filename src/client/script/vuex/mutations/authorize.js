export default {
    /**
     * @param {typeof import("../state").default} state
     * @param {Object} user
     */
    authorize(state, authorize) {
        state.authorize = authorize;
    },
};
