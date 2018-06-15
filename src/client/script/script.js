import Vue from 'vue';
import { mapActions } from 'vuex';
import modules, { facebookInitialize } from './modules';
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
        keys.forEach(key => {
            this[`load_${key}s`]();
        });
    },
    methods: {
        ...mapActions(keys.map(key => `load_${key}s`)),
    },
    render: h => h(app, { ref: 'app' }),
});
