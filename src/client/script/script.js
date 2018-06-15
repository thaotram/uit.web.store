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
        router.push('/');

        await Facebook.initialize();
        const status = await Facebook.status(socket);

        if (!status.isLogin) {
            router.push('/login');
        } else {
            store.commit('authorize', status.res);
            if (typeof status.res.employeeId === 'number') {
                router.push('/admin/pos');
            } else {
                router.push('/error/not-authorized');
            }
        }

        keys.forEach(key => {
            this[`load_${key}s`]();
        });
    },
    methods: {
        ...mapActions(keys.map(key => `load_${key}s`)),
    },
    render: h => h(app, { ref: 'app' }),
});
