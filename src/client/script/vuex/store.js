import Vue from 'vue';
import Vuex from 'vuex';
// import VuexPersistedstate from 'vuex-persistedstate';
import state from './state';

import gui from './mutations/gui';
import pos from './mutations/pos';

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    // plugins: [VuexPersistedstate()],
    mutations: {
        ...gui,
        ...pos,
    },
    actions: {
        async pos_load_books({ commit }) {
            const res = await fetch('/api/books');
            commit('pos_load_books', await res.json());
        },
    },
});
