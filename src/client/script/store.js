import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistedstate from 'vuex-persistedstate';
import state from './state';

import gui from './store/gui';

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    plugins: [VuexPersistedstate()],
    mutations: {
        toogleSideBar(state) {
            state.gui.fullSideBarSize ^= true;
        },
    },
});
