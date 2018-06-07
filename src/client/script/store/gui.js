import State from '../state';

export default {
    /**
     * @param {State} state
     */
    toogleSideBar(state) {
        state.gui.fullSideBarSize ^= true;
    },
};
