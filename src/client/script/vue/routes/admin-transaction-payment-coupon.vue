<template>
    <row- class="admin admin-transaction-payment-coupon light" >
        <col- class="full noOverflow">
            <row- size="40" 
                  class="title">
                <button- text="Thêm phiếu trả" 
                         icon=""
                         class="shadow round green"
                         @click.native="$router.push('/admin/transaction/payment-coupon/create')"/>
            </row->
            <s- :s="20"/>
            <table-view- :col-size="size"
                         :has-content="paymentCouponResults.length !== 0"
                         class="full shadow round">
                <template slot="header">
                    <table-row- size="45">
                        <div>STT</div>
                        <div>Nhà cung cấp</div>
                        <div>Người lập phiếu</div>
                        <div>Thời gian</div>
                        <div>Nội dung</div>
                        <div>Số tiền</div>
                        <span/>
                    </table-row->
                </template>
                <template slot="content">
                    <table-row- v-for="(paymentCoupon, index) in paymentCouponResults"
                                :key="paymentCoupon.id"
                                size="60"
                                @click.native="$router.push(`/admin/transaction/payment-coupon-detail/${paymentCoupon.id}`)">
                        <div>{{ index + 1 }}</div>
                        <div>{{ (get('Supplier', paymentCoupon.supplierId) || {}).name }}</div>
                        <user- :employee-id="paymentCoupon.employeeId"/>
                        <div>{{ timeAgo(paymentCoupon.create) }}</div>
                        <div>{{ paymentCoupon.content }}</div>
                        <div>{{ money(paymentCoupon.money) }}</div>
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
                ['0 280px', 'start'],
                ['0 200px', 'start'],
                ['0 120px', 'end'],
                ['1 150px', 'start'],
                ['0 120px', 'end'],
            ],
        };
    },
    computed: {
        ...mapState(['app', 'data']),
        ...mapGetters(['get']),
        paymentCouponResults() {
            return this.data.PaymentCoupons;
        },
    },
    mounted() {
        this.load_all('PaymentCoupon');
        this.load_all('Supplier');
    },
    methods: {
        ...mapActions(['load_all']),
        avatar,
        timeAgo,
        money,
    },
};
</script>
<style lang="scss">
.admin-transaction-payment-coupon {
    > .col {
        > .row.title > .input.search-box {
            min-width: 400px;
        }
    }
}
</style>
