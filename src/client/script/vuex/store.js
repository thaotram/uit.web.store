import Vue from 'vue';
import Vuex from 'vuex';
// import VuexPersistedstate from 'vuex-persistedstate';
import state from './state';

import admin from './mutations/admin';
import gui from './mutations/gui';
import pos from './mutations/pos';

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    // plugins: [VuexPersistedstate()],
    mutations: {
        ...admin,
        ...gui,
        ...pos,
    },
    actions: {
        async load_books({ commit }) {
            const res = await fetch('/api/books');
            commit('load_books', await res.json());
        },
        async load_employees({ commit }) {
            const res = await fetch('/api/employees');
            commit('load_employees', await res.json());
        },
    },
});
