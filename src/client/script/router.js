import Vue from 'vue';
import VueRouter from 'vue-router';
import Nanobar from 'nanobar';

Vue.use(VueRouter);

window.nanobar = new Nanobar({
    id: 'nanobar',
});

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: () => import('./vue/routes/home.vue'),
        },
    ],
});

router.beforeEach((to, from, next) => {
    window.nanobar.go(90);
    next();
});

router.afterEach(() => {
    const body = document.getElementById('body');
    window.nanobar.go(100);
    if (body) body.scrollTop = 0;
});

export default router;
