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
            path: '/admin/user',
            name: 'admin-user',
            component: () => import('admin-user'),
        },
        {
            path: '/admin/transaction/export-bill',
            name: 'admin-transaction-export-bill',
            component: () => import('admin-transaction-export-bill'),
        },
        {
            path: '/admin/transaction/import-coupon',
            name: 'admin-transaction-import-coupon',
            component: () => import('admin-transaction-import-coupon'),
        },
        {
            path: '/admin/transaction/order-coupon',
            name: 'admin-transaction-order-coupon',
            component: () => import('admin-transaction-order-coupon'),
        },
        {
            path: '/admin/transaction/payment-coupon',
            name: 'admin-transaction-payment-coupon',
            component: () => import('admin-transaction-payment-coupon'),
        },
        {
            path: '/admin/management/employee',
            name: 'admin-management-employee',
            component: () => import('admin-management-employee'),
        },
        {
            path: '/admin/management/supplier',
            name: 'admin-management-supplier',
            component: () => import('admin-management-supplier'),
        },
    ],
});

router.afterEach(() => {
    setTimeout(() => {
        nanobar.go(100);
    }, 0);
});

export default router;
