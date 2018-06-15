<template>
    <col- id="sidebar"
          :class="{fullSize: gui.fullSideBarSize, hide: typeof authorize.id !== 'number'}"
          size="50"
          class="dark">
        <button- icon=""
                 class="rotate"
                 text="Thu gọn"
                 @click.native="gui_toogleSideBar()"/>
        <line-/>
        <button- :active="is('admin-pos')"
                 icon=""
                 text="Bán hàng"
                 @click.native="go('/admin/pos')"/>

        <!-- Sách -->
        <button- :active="is('admin-book')"
                 icon=""
                 text="Sách"
                 @click.native="go('/admin/book')"/>
        <col- :class="{show: match(/^admin-book/)}"
              size="50"
              class="indent">
            <button- :active="match(/^admin-book-detail/)"
                     icon=""
                     text="Thông tin sách"
                     @click.native="go('/admin/book/detail')"/>
            <button- :active="is('admin-book-add')"
                     icon=""
                     text="Thêm sách"
                     @click.native="go('/admin/book/add')"/>        
        </col->

        <!-- Người dùng -->
        <button- :active="is('admin-user')"
                 icon=""
                 text="Người dùng"
                 @click.native="go('/admin/user')"/>
        <!-- <col- :class="{show: match(/^admin-user/)}"
              size="50"
              class="indent">
            <button- :active="is('admin-user-feedback')"
                     icon=""
                     text="Phản hồi"
                     @click.native="go('/admin/user/feedback')"/>  
        </col-> -->

        <!-- Hóa đơn -->
        <button- :active="is('admin-transaction')"
                 icon=""
                 text="Đặt hàng và giao dịch"/>
        <col- :class="{show: match(/^admin-transaction/)}"
              size="50"
              class="indent">
            <button- :active="is('admin-transaction-export-bill')"
                     icon=""
                     text="Hóa đơn bán hàng"
                     @click.native="go('/admin/transaction/export-bill')"/>
            <button- :active="is('admin-transaction-import-coupon')"
                     icon=""
                     text="Phiếu nhập sách"
                     @click.native="go('/admin/transaction/import-coupon')"/>
            <button- :active="is('admin-transaction-order-coupon')"
                     icon=""
                     text="Phiếu đặt sách"
                     @click.native="go('/admin/transaction/order-coupon')"/>
            <button- :active="is('admin-transaction-payment-coupon')"
                     icon=""
                     text="Phiếu trả tiền"
                     @click.native="go('/admin/transaction/payment-coupon')"/>
        </col->

        <!-- Thêm nhân viên -->
        <button- :active="is('admin-management-employee')"
                 icon=""
                 text="Nhân viên"
                 @click.native="go('/admin/management/employee')"/>
        <col- :class="{show: match(/^admin-management-employee/)}"
              size="50"
              class="indent">
            <button- :active="is('admin-management-employee-add')"
                     icon=""
                     text="Thêm nhân viên"
                     @click.native="go('/admin/management/employee/add')"/>
        </col->

        <!-- Thêm nhà cung cấp -->
        <button- :active="is('admin-management-supplier')"
                 icon=""
                 text="Nhà cung cấp"
                 @click.native="go('/admin/management/supplier')"/>
        <col- :class="{show: match(/^admin-management-supplier/)}"
              size="50"
              class="indent">
            <button- :active="is('admin-management-supplier-add')"
                     icon=""
                     text="Thêm nhà cung cấp"
                     @click.native="go('/admin/management/supplier/add')"/>
        </col->

        <s-/>
        <button- icon="" 
                 text="Thông tin"/>
        <button- icon="" 
                 text="Đăng xuất"
                 @click.native="logout"/>
    </col->
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { Facebook } from '../../modules';
export default {
    components: {
        ...'col',
        ...'row',
        ...'line',
        ...'button',
        ...'s',
        ...'label',
        ...'image',
    },
    computed: {
        ...mapState(['authorize', 'gui']),
    },
    methods: {
        ...mapMutations(['gui_toogleSideBar']),
        go(name) {
            this.$router.push(name);
        },
        is(name) {
            return this.$route.name === name;
        },
        match(regex) {
            if (!this.$route.name) return false;
            return this.$route.name.match(regex) !== null;
        },
        logout() {
            Facebook.FB.logout(this.$root.checkLogin);
        },
    },
};
</script>
<style lang="scss">
#sidebar {
    overflow: hidden;
    &.hide {
        width: 0 !important;
    }
    z-index: 2;

    .button.parent.active {
        background: transparent;
    }

    .button {
        transition: all 0.4s;
    }

    > .user > .label > .text {
        line-height: 30px;
        height: 30px;
    }

    > .button:hover + .indent,
    > .indent:hover,
    > .indent.show {
        > .button {
            height: 50px;
            opacity: 1;
        }
    }
    > .indent > .button {
        min-height: 0px;
        height: 0;
        opacity: 0;
        overflow: hidden;
    }

    &:not(.fullSize) {
        width: 50px;
        > .user {
            padding: 10px;
            min-height: 30px;
            > * {
                max-height: 30px;
                min-height: 30px;
                height: 30px;
            }
            > .image {
                width: 30px;
                min-width: 30px;
            }
        }
        > .indent > .button {
            padding-left: 0;
        }
    }
    &.fullSize {
        width: $side-width;
        > .user {
            padding: 15px;
            > * {
                max-height: 50px;
                min-height: 50px;
                height: 50px;
            }
        }
        .rotate > .icon {
            transform: rotate(-180deg);
        }
        > .indent > .button {
            padding-left: 25px;
        }
    }
}
</style>
