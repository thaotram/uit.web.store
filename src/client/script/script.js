import Vue from 'vue';
import router from './router';
import store from './vuex/store';
import app from './vue/app/app.vue';
import { socket } from './socket/socket';
import('../style/index.scss');

import modules, { facebookInitialize } from './modules';

new Vue({
    el: '#app',
    router,
    store,
    async beforeCreate() {
        await facebookInitialize();
        const FB = modules.FB;
        FB.getLoginStatus(response => {
            if (response.status === 'connected') {
                console.log(response);
            }
        });
        socket;
    },
    render: h => h(app, { ref: 'app' }),
});
