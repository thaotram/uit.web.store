<template>
    <row- class="admin admin-transaction-import-coupon light" >
        <col- class="full noOverflow">
            <row- size="40" 
                  class="title">
                <button- text="Tạo phiếu nhập" 
                         icon=""
                         class="shadow round green"
                         @click.native="$router.push('/admin/transaction/import-coupon/create')"/>
            </row->
            <s- :s="20"/>
            <table-view- :col-size="size"
                         :has-content="importCouponResults.length !== 0"
                         class="full shadow round">
                <template slot="header">
                    <table-row- size="45">
                        <div>STT</div>
                        <div>Nhà cung cấp</div>
                        <div>Người ghi phiếu</div>
                        <div>Thời gian</div>
                        <div>Số lượng</div>
                        <div>Thành tiền</div>
                        <span/>
                    </table-row->
                </template>
                <template slot="content">
                    <table-row- v-for="(importCoupon, index) in importCouponResults"
                                :key="importCoupon.id"
                                size="60"
                                @click.native="$router.push(`/admin/transaction/import-coupon-detail/${importCoupon.id}`)">
                        <div>{{ index + 1 }}</div>
                        <div>{{ (get('Supplier', importCoupon.supplierId) || {}).name }}</div>
                        <user- :employee-id="importCoupon.employeeId"/>
                        <div>{{ timeAgo(importCoupon.create) }}</div>
                        <div>{{ count(importCoupon) }}</div>
                        <div>{{ money(total(importCoupon)) }}</div>
                    </table-row->
                </template>
                <template slot="placeholder">
                    <row- size="70">
                        <button- icon=""
                                 class="noHover"
                                 text="Không có kết quả nào khớp với kết quả tìm kiếm."/>
                    </row->
                </template>
            </table-view->
        </col->
    </row->
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { avatar, timeAgo, money } from '../../modules/index';

export default {
    components: {
        ...'button',
        ...'col',
        ...'markdown',
        ...'input',
        ...'label',
        ...'image',
        ...'line',
        ...'list',
        ...'row',
        ...'s',
        ...'table-row',
        ...'table-view',
        ...'user',
    },
    data() {
        return {
            search: '',
            size: [
                ['0 30px', 'center'],
                ['1 200px', 'start'],
                ['0 250px', 'start'],
                ['0 170px', 'end'],
                ['0 100px', 'end'],
                ['0 150px', 'end'],
            ],
        };
    },
    computed: {
        ...mapState(['app', 'data']),
        ...mapGetters(['get']),
        importCouponResults() {
            return this.data.ImportCoupons;
        },
    },
    mounted() {
        this.load_all('ImportCoupon');
        this.load_all('Supplier');
    },
    methods: {
        ...mapActions(['load_all']),
        avatar,
        timeAgo,
        money,
        count(importCoupon) {
            return importCoupon.importCouponDetails
                .map(detail => detail.count)
                .reduce((a, b) => a + b, 0);
        },
        total(importCoupon) {
            return importCoupon.importCouponDetails
                .map(detail => detail.price * detail.count)
                .reduce((a, b) => a + b, 0);
        },
    },
};
</script>
<style lang="scss">
.admin-transaction-import-coupon {
    > .col {
        > .row.title > .input.search-box {
            min-width: 400px;
        }
    }
}
</style>
