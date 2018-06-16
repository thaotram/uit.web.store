import Vue from 'vue';
import { mapActions } from 'vuex';
import { Facebook } from './modules';
import router from './router';
import { socket } from './socket/socket';
import app from './vue/app/app.vue';
import keys from './vuex/keys';
import store from './vuex/store';
import('../style/index.scss');

new Vue({
    el: '#app',
    router,
    store,
    async beforeCreate() {
        await Facebook.initialize();
        await this.checkLogin();
    },
    mounted() {
        socket.on('connect', () => {
            socket.on('update', key => {
                this[`load_${key}s`]();
                console.log(`load_${key}s`);
            });
        });
    },
    methods: {
        ...mapActions(keys.map(key => `load_${key}s`)),
        async checkLogin() {
            const status = await Facebook.status(socket);
            if (!status.isLogin) {
                store.commit('authorize', {});
                router.push('/authorize/login');
            } else {
                store.commit('authorize', status.res);
                if (typeof status.res.employeeId === 'number') {
                    router.push('/admin/pos');
                    keys.forEach(key => {
                        this[`load_${key}s`]();
                    });
                } else {
                    router.push('/authorize/error');
                }
            }
        },
    },
    render: h => h(app, { ref: 'app' }),
});
