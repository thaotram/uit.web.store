import money from 'v-money';
import Vue from 'vue';
import { Facebook } from './modules';
import router from './router';
import { initialize, socket } from './socket/socket';
import app from './vue/app/app.vue';
import models from './vuex/models';
import store from './vuex/store';
import('../style/index.scss');

Vue.use(money);
new Vue({
    el: '#app',
    router,
    store,
    async beforeCreate() {
        await Facebook.initialize();
        await this.checkLogin();
    },
    mounted() {
        initialize(this);
    },
    methods: {
        async checkLogin() {
            const status = await Facebook.status(socket);
            if (!status.isLogin) {
                store.commit('authorize', {});
                router.push('/authorize/login');
            } else {
                store.commit('authorize', status.res);
                if (typeof status.res.employeeId === 'number') {
                    router.push('/admin/pos');
                    models.forEach(_ =>
                        this.$store.dispatch('read', { return: 'json', _ }),
                    );
                } else {
                    router.push('/authorize/error');
                }
            }
        },
    },
    render: h => h(app, { ref: 'app' }),
});
