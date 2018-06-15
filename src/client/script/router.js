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
            path: '/authorize/login',
            name: 'authorize-login',
            component: () => import('authorize-login'),
        },
        {
            path: '/authorize/error',
            name: 'authorize-error',
            component: () => import('authorize-error'),
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
            path: '/admin/book/detail/:id',
            name: 'admin-book-detail',
            component: () => import('admin-book-detail'),
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
            path: '/admin/transaction/import-coupon/add',
            name: 'admin-transaction-import-coupon-add',
            component: () => import('admin-transaction-import-coupon-add'),
        },
        {
            path: '/admin/transaction/order-coupon',
            name: 'admin-transaction-order-coupon',
            component: () => import('admin-transaction-order-coupon'),
        },
        {
            path: '/admin/transaction/order-coupon/add',
            name: 'admin-transaction-order-coupon-add',
            component: () => import('admin-transaction-order-coupon-add'),
        },
        {
            path: '/admin/transaction/payment-coupon',
            name: 'admin-transaction-payment-coupon',
            component: () => import('admin-transaction-payment-coupon'),
        },
        {
            path: '/admin/transaction/payment-coupon/add',
            name: 'admin-transaction-payment-coupon-add',
            component: () => import('admin-transaction-payment-coupon-add'),
        },
        {
            path: '/admin/management/employee',
            name: 'admin-management-employee',
            component: () => import('admin-management-employee'),
        },
        {
            path: '/admin/management/employee/add',
            name: 'admin-management-employee-add',
            component: () => import('admin-management-employee-add'),
        },
        {
            path: '/admin/management/employee/edit/:id',
            name: 'admin-management-employee-edit',
            component: () => import('admin-management-employee-edit'),
        },
        {
            path: '/admin/management/supplier',
            name: 'admin-management-supplier',
            component: () => import('admin-management-supplier'),
        },
        {
            path: '/admin/management/supplier/add',
            name: 'admin-management-supplier-add',
            component: () => import('admin-management-supplier-add'),
        },
        {
            path: '/admin/management/supplier/edit/:id',
            name: 'admin-management-supplier-edit',
            component: () => import('admin-management-supplier-edit'),
        },
    ],
});

router.afterEach(() => {
    setTimeout(() => {
        nanobar.go(100);
    }, 0);
});

export default router;
