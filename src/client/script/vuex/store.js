import Vue from 'vue';
import Vuex from 'vuex';
// import VuexPersistedstate from 'vuex-persistedstate';
import state from './state';
import { read } from '../modules/src/fetch';
Vue.use(Vuex);

export default new Vuex.Store({
    state,
    // plugins: [VuexPersistedstate()],
    mutations: {
        set_data(state, payload) {
            console.log('Đã tải', payload._);
            state.data[payload._] = payload.data;
        },
        authorize(state, authorize) {
            state.authorize = authorize;
        },
    },
    actions: {
        async read({ commit }, body) {
            const data = await read(body);
            commit('set_data', {
                _: `${body._}s`,
                data: await data.json(),
            });
        },
    },
});
