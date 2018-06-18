import Vue from 'vue';
import Vuex from 'vuex';
// import VuexPersistedstate from 'vuex-persistedstate';
import state from './state';
import { read } from '../modules';
import { socket } from '../socket/socket';
Vue.use(Vuex);

export default new Vuex.Store({
    // plugins: [VuexPersistedstate()],
    state,
    getters: {
        get: state => (model, id) => {
            
            return state.data[`${model}s`].find(e => e.id === Number(id));
        },
    },
    mutations: {
        set(state, payload) {
            console.log('Đã tải', payload.name);
            state.data[payload.name] = payload.data;
        },
        add(state, payload) {
            if (payload.item) {
                return state.data[`${payload.name}s`].push(payload.item);
            } else if (payload.array && Array.isArray(payload.array)) {
                payload.array.forEach(item => state.data[`${payload.name}s`].push(item));
            }
        },
        authorize(state, authorize) {
            state.authorize = authorize;
        },
    },
    actions: {
        // Là hàm đọc bất đồng bộ được gọi ra từ socket
        async read({ commit }, body) {
            commit('set', {
                name: `${body._}s`,
                data: await read(body),
            });
        },

        // Là hàm lấy các đối tượng trong cơ sở dữ liệu ở client
        // hoặc gửi lệnh lấy từ phía server về rồi lưu và trả về
        // dữ liệu từ client

        async load({ getters, commit }, payload) {
            const object = getters.get(payload.name, payload.id);
            if (!object) {
                const array = await read({
                    _: payload.name,
                    '=': {
                        id: Number(payload.id),
                    },
                    return: 'json',
                });
                commit('add', {
                    name: payload.name,
                    item: array[0],
                });
            }
        },
    },
});
