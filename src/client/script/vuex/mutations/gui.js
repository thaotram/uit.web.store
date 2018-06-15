export default {
    /**
     * @param {typeof import("../state").default} state
     */
    gui_toogleSideBar(state) {
        state.gui.fullSideBarSize ^= true;
    },
};
