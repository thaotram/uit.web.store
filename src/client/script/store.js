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
        ...gui,
        loadBooks(state, books) {
            state.data.books = books;
        },
    },
    actions: {
        async loadBooks({ commit }) {
            const res = await fetch('/api/books');
            console.log(res);
            return;
        },
    },
});
