<template>
    <row- class="admin admin-transaction-import-coupon light" >
        <col- class="full noOverflow">
            <row- size="40" 
                  class="title">
                <button- text="Tạo phiếu nhập" 
                         icon=""
                         class="shadow round green"
                         @click.native="$router.push('/admin/transaction/import-coupon/createate')"/>
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
                                size="60">
                        <div>
                            {{ index + 1 }}
                        </div>
                        <div>
                            {{ supplier(importCoupon.supplierId).name }}
                        </div>
                        <div class="row">
                            <image- :src="avatar(employee(importCoupon.employeeId).id)"
                                    class="round square border"
                                    size="30"/>
                            <s- :s="10"/>
                            <span class="full">
                                {{ employee(importCoupon.employeeId).name }}
                            </span>
                        </div>
                        <div>
                            {{ timeAgo(importCoupon.create) }}
                        </div>
                        <div>
                            {{ importCoupon.count }}
                        </div>
                        <div>
                            {{ money(importCoupon.total) }}
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
import { mapState } from 'vuex';
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
                ['0 150px', 'end'],
            ],
        };
    },
    computed: {
        ...mapState(['app', 'data']),
        importCouponResults() {
            console.log(this.data);
            return [];
            // return this.data.ImportCoupons.map(importCoupon => ({
            //     ...importCoupon,
            //     total: importCoupon.importCouponDetails
            //         .map(detail => detail.count * detail.price)
            //         .reduce((a, b) => a + b, 0),
            //     count: importCoupon.importCouponDetails
            //         .map(detail => detail.count)
            //         .reduce((a, b) => a + b, 0),
            // }));
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
.admin-transaction-import-coupon {
    > .col {
        > .row.title > .input.search-box {
            min-width: 400px;
        }
    }
}
</style>
