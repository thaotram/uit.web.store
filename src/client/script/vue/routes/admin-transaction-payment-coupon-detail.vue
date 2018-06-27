<template>
    <row- class="admin admin-transaction-payment-coupon-detail light" >
        <s-/>
        <col- class="right noOverflow">
            <div class="col full shadow round padding">
                <div class="semibold">Nhân viên:</div>
                <s- :s="10"/>
                <user- :employee-id="paymentCoupon.employeeId"/>
                <s- :s="10"/>
                <line-/>
                <s- :s="10"/>
                <div class="semibold">Thời gian: {{ paymentCoupon.create }}</div>
                <s- :s="10"/>
                <div class="semibold">Nhà cung cấp: {{ (get('Supplier', paymentCoupon.supplierId) || {}).name }}</div>
                <s- :s="10"/>
                <div class="semibold">Nội dung: </div>
                <s- :s="5"/>
                <div>{{ paymentCoupon.content }}</div>
            </div>
            <s- :s="20"/>
            <col- class="shadow round pay">
                <row- class="pay-row bold">
                    <span>Tổng tiền:</span>
                    <s-/>
                    <span class="green-text">{{ money(paymentCoupon.money) }}</span>
                </row->
                <s- :s="10"/>
                <row- size="40">
                    <button- class="full green round"
                             icon="" 
                             text="In phiếu trả tiền"
                             @click.native="print"/>
                </row->
            </col->
        </col->
        <s-/>

        <div ref="print" 
             class="shadow round full report">
            <col- class="bill">
                <row- class="header"
                      size="40">
                    <div class="logo"/>
                    <s- :s="10"/>
                    <span class="logo-text d full">{{ app.name }}</span>
                </row->
                <s- :s="5"/>
                <p class="text">- Địa chỉ: {{ app.address }}</p>
                <p class="text">- Điện thoại: {{ app.phone }}</p>
                <s- :s="8"/>
                <div class="line"/>
                <s- :s="8"/>
                <p class="text bold big center">HÓA ĐƠN BÁN LẺ</p>
                <s- :s="8"/>
                <div class="bill-table">
                    <p class="text">Thời gian: {{ paymentCoupon.create }}</p>
                    <s- :s="8"/>
                    <div class="row">
                        <div>Tên sách</div>
                        <div>SL</div>
                        <div>Đơn giá</div>
                        <div>Thành tiền</div>
                    </div>
                    <div class="line"/>
                    <div class="row bold">
                        <div>Tổng cộng</div>
                        <div/>
                    </div>
                </div>
                <s- :s="20"/>
                <p class="text bold center">Xin cảm ơn quý khách!</p>
            </col->
        </div>
    </row->
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { money, found } from '../../modules/index';

export default {
    components: {
        ...'book-search-item',
        ...'button',
        ...'col',
        ...'dropdown',
        ...'image',
        ...'markdown',
        ...'input',
        ...'label',
        ...'line',
        ...'list',
        ...'user',
        ...'row',
        ...'s',
        ...'table-row',
        ...'table-view',
    },
    data() {
        return {
            paymentCoupon: {},

            filterBookName: '',
            filterUserName: '',

            user: {
                id: 0,
                name: 'Khách vãng lai',
            },

            size: [
                ['0 80px', 'end'],
                [1, 'start'],
                ['0 70px', 'center'],
                ['0 80px', 'end'],
                ['0 80px', 'end'],
            ],
        };
    },
    computed: {
        ...mapState(['app', 'data']),
        ...mapGetters(['get']),
    },
    async mounted() {
        this.paymentCoupon = await this.load_by_id({
            name: 'PaymentCoupon',
            id: this.$route.params.id,
        });
        await this.load_by_id({
            name: 'Supplier',
            id: this.paymentCoupon.supplierId,
        });
    },
    methods: {
        ...mapActions(['load_by_id']),
        money,
        print() {
            this.$root.$refs.app.print(this.$refs.print);
        },
    },
};
</script>
<style lang="scss">
.admin-transaction-payment-coupon-detail {
    > .right {
        flex: 0 350px;
        max-width: 350px;
        min-width: 350px;
        > .pay {
            padding: 15px;
            > .pay-row {
                font-size: 15px;
                padding: 3px 2px;
            }
        }
    }
    .report {
        position: absolute;
        z-index: -1;
        visibility: hidden;
    }
}
</style>
