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

        async load_users({ commit }) {
            const res = await fetch('/api/users');
            commit('load_users', await res.json());
        },

        async load_suppliers({ commit }) {
            const res = await fetch('/api/suppliers');
            commit('load_suppliers', await res.json());
        },

        async pos_create_cart_and_export_bill({ state }) {
            return await fetch('/api/exportBill/createWithContent', {
                method: 'POST',
                body: JSON.stringify({
                    employeeId: 1,
                    cartDetails: state.pos.sells.map(sell => ({
                        id: sell.book.id,
                        amount: sell.amount,
                    })),
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        },
    },
});
