<template>
    <row- class="admin admin-transaction-order-coupon light" >
        <col- class="full noOverflow">
            <row- size="40" 
                  class="title">
                <button- text="Tạo phiếu đặt" 
                         icon=""
                         class="shadow round green"
                         @click.native="$router.push('/admin/transaction/order-coupon/create')"/>
                <s-/>
                <input- v-model="search" 
                        class="shadow search-box round"  
                        type="text"
                        icon=""
                        placeholder="Tìm kiếm"/>
            </row->
            <s- :s="20"/>
            <table-view- :col-size="size"
                         :has-content="orderCouponResults.length !== 0"
                         class="full shadow round">
                <template slot="header">
                    <table-row- size="45">
                        <div>STT</div>
                        <div>Nhà cung cấp</div>
                        <div>Người đặt</div>
                        <div>Thời gian</div>
                        <div>Tựa sách</div>
                        <div>Số lượng</div>
                        <span/>
                    </table-row->
                </template>
                <template slot="content">
                    <table-row- v-for="(orderCoupon, index) in orderCouponResults"
                                :key="orderCoupon.id"
                                size="60"
                                @click.native="$router.push(`/admin/transaction/order-coupon-detail/${orderCoupon.id}`)">
                        <div>{{ index + 1 }}</div>
                        <div>{{ (get('Supplier', orderCoupon.supplierId) || {}).name }}</div>
                        <user- :employee-id="orderCoupon.employeeId"/>
                        <div>{{ timeAgo(orderCoupon.create) }}</div>
                        <div>{{ orderCoupon.type }}</div>
                        <div>{{ orderCoupon.count }}</div>
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
import { mapState, mapActions, mapGetters } from 'vuex';
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
                ['0 100px', 'end'],
            ],
        };
    },
    computed: {
        ...mapState(['app', 'data']),
        ...mapGetters(['get']),
        orderCouponResults() {
            return this.data.OrderCoupons.map(orderCoupon => ({
                ...orderCoupon,
                type: orderCoupon.orderCouponDetails.length,
                count: orderCoupon.orderCouponDetails
                    .map(detail => detail.count)
                    .reduce((a, b) => a + b, 0),
            }));
        },
    },
    mounted() {
        this.load_all('OrderCoupon');
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
.admin-transaction-order-coupon {
    > .col {
        > .row.title > .input.search-box {
            min-width: 400px;
        }
    }
}
</style>
