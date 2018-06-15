<template>
    <row- class="admin admin-transaction-order-coupon light" >
        <col- class="full noOverflow">
            <row- size="40" 
                  class="title">
                <button- text="Tạo phiếu đặt" 
                         icon=""
                         class="shadow round green"
                         @click.native="$router.push('/admin/transaction/order-coupon/add')"/>
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
                                size="60">
                        <div>
                            {{ index + 1 }}
                        </div>
                        <div>
                            {{ supplier(orderCoupon.supplierId).name }}
                        </div>
                        <div class="row">
                            <image- :src="avatar(employee(orderCoupon.employeeId).id)"
                                    class="round square border"
                                    size="30"/>
                            <s- :s="10"/>
                            <span class="full">
                                {{ employee(orderCoupon.employeeId).name }}
                            </span>
                        </div>
                        <div>
                            {{ timeAgo(orderCoupon.create) }}
                        </div>
                        <div>
                            {{ orderCoupon.type }}
                        </div>
                        <div>
                            {{ orderCoupon.count }}
                        </div>
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
import { mapState, mapActions } from 'vuex';
import { avatar, timeAgo, money, user, employee, supplier } from '../../modules/index';

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
        orderCouponResults() {
            return this.data.orderCoupons.map(orderCoupon => ({
                ...orderCoupon,
                type: orderCoupon.orderCouponDetails.length,
                count: orderCoupon.orderCouponDetails
                    .map(detail => detail.count)
                    .reduce((a, b) => a + b, 0),
            }));
        },
    },
    methods: {
        avatar,
        timeAgo,
        money,
        user,
        employee,
        supplier,
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
