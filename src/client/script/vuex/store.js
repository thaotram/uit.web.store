import Vue from 'vue';
import Vuex from 'vuex';
// import VuexPersistedstate from 'vuex-persistedstate';
import state from './state';

import keys from './keys';

import admin from './mutations/admin';
import gui from './mutations/gui';
import pos from './mutations/pos';
import authorize from './mutations/authorize';

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    // plugins: [VuexPersistedstate()],
    mutations: {
        ...admin,
        ...gui,
        ...pos,
        ...authorize,
    },
    actions: {
        ...keys.reduce((object, key) => {
            object[`load_${key}s`] = async ({ commit }) => {
                const res = await fetch(`/api/${key}s`, {
                    credentials: 'same-origin',
                });
                commit(`load_${key}s`, await res.json());
            };
            return object;
        }, {}),

        async pos_create_cart_and_export_bill({ state }) {
            return await fetch('/api/exportBill/createWithContent', {
                method: 'POST',
                credentials: 'same-origin',
                body: JSON.stringify({
                    employeeId: 1,
                    cartDetails: state.pos.sells.map(sell => ({
                        id: sell.book.id,
                        count: sell.count,
                    })),
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        },
    },
});
