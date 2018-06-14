import Vue from 'vue';
import VueRouter from 'vue-router';
import Nanobar from 'nanobar';

Vue.use(VueRouter);

const nanobar = new Nanobar({
    id: 'nanobar',
});

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('home'),
        },
        {
            path: '/admin/pos',
            name: 'admin-pos',
            component: () => import('admin-pos'),
        },
        {
            path: '/admin/book',
            name: 'admin-book',
            component: () => import('admin-book'),
        },
        {
            path: '/admin/book/add',
            name: 'admin-book-add',
            component: () => import('admin-book-add'),
        },

        {
            path: '/admin/management/employee',
            name: 'admin-management-employee',
            component: () => import('admin-management-employee'),
        },
    ],
});

router.afterEach(() => {
    setTimeout(() => {
        nanobar.go(100);
    }, 0);
});

export default router;
