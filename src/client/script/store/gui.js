export default {
    /**
     * @param {typeof import("../state").default} state
     */
    toogleSideBar(state) {
        state.gui.fullSideBarSize ^= true;
    },
};
