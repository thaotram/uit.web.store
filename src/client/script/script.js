import Vue from 'vue';
import router from './router';
import store from './vuex/store';
import app from './vue/app/app.vue';
import { socket } from './socket/socket';
import('../style/index.scss');

import modules, { facebookInitialize } from './modules';
import { mapState, mapActions } from 'vuex';

new Vue({
    el: '#app',
    router,
    store,
    async beforeCreate() {
        await facebookInitialize();
        const FB = modules.FB;

        FB.getLoginStatus(response => {
            if (response.status === 'connected') {
                const req = {
                    token: response.authResponse.accessToken,
                    id: Number(response.authResponse.userID),
                };
                socket.emit('login', req, res => {
                    console.log('Thông tin đăng nhập ở đây nè!', res);
                });
            }
        });
    },
    mounted() {
        this.load_books();
        this.load_employees();
        this.load_users();
    },
    methods: {
        ...mapActions(['load_books', 'load_employees', 'load_users']),
    },
    render: h => h(app, { ref: 'app' }),
});
