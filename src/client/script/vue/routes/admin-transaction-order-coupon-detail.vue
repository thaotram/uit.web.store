<template>
    <row- class="admin admin-transaction-order-coupon-detail light" >
        <col- class="left full noOverflow">
            <row- size="40" 
                  class="title">
                <s-/>
                <input- v-model="filterBookName" 
                        class="shadow search-box round"  
                        type="text"
                        icon=""
                        placeholder="Tìm kiếm sản phẩm trong hóa đơn"/>
            </row->
            <s- :s="20"/>
            <table-view- :col-size="size"
                         class="full shadow round">
                <template slot="header">
                    <table-row- size="45">
                        <div>Mã</div>
                        <div>Tên sản phẩm</div>
                        <div>Số lượng</div>
                        <div>Giá bìa</div>
                        <div>Thành tiền</div>
                        <span/>
                    </table-row->
                </template>
                <template slot="content">
                    <table-row- v-for="orderCouponDetail in orderCouponDetailResults" 
                                :key="orderCouponDetail.id"
                                size="45">
                        <div>{{ orderCouponDetail.bookId }}</div>
                        <div>{{ orderCouponDetail.name }}</div>
                        <div>{{ orderCouponDetail.count }}</div>
                        <div>{{ orderCouponDetail.coverPrice }}</div>
                        <div>{{ money(orderCouponDetail.coverPrice * orderCouponDetail.count) }}</div>
                    </table-row->
                </template>
            </table-view->
        </col->
        <col- class="right noOverflow">
            <div class="col full shadow round padding">
                <div class="semibold">Nhân viên:</div>
                <s- :s="10"/>
                <user- :employee-id="orderCoupon.employeeId"/>
                <s- :s="10"/>
                <line-/>
                <s- :s="10"/>
                <div class="semibold">Thời gian: {{ orderCoupon.create }}</div>
            </div>
            <s- :s="20"/>
            <col- class="shadow round pay">
                <row- class="pay-row bold">
                    <span>Số lượng:</span>
                    <s-/>
                    <span class="green-text">{{ count }}</span>
                </row->
                <row- class="pay-row bold">
                    <span>Tổng tiền theo giá bìa:</span>
                    <s-/>
                    <span class="green-text">{{ money(total) }}</span>
                </row->
                <s- :s="10"/>
                <row- size="40">
                    <button- class="full green round"
                             icon="" 
                             text="In phiếu đặt hàng"
                             @click.native="print"/>
                </row->
            </col->
        </col->

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
                    <p class="text">Thời gian: {{ orderCoupon.create }}</p>
                    <s- :s="8"/>
                    <div class="row">
                        <div>Tên sách</div>
                        <div>SL</div>
                        <div>Đơn giá</div>
                        <div>Thành tiền</div>
                    </div>
                    <div class="line"/>
                    <div v-for="(orderCouponDetail, index) in orderCoupon.orderCouponDetails" 
                         :key="index"
                         class="row">
                        <div>{{ (get('Book', orderCouponDetail.bookId) || {}).name }}</div>
                        <div>{{ orderCouponDetail.count }}</div>
                        <div>{{ money(orderCouponDetail.price) }}</div>
                        <div>{{ money(orderCouponDetail.count * orderCouponDetail.price) }}</div>
                    </div>
                    <div class="line"/>
                    <div class="row bold">
                        <div>Tổng cộng</div>
                        <div>{{ count }}</div>
                        <div/>
                        <div>{{ money(total) }}</div>
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
            orderCoupon: {
                orderCouponDetails: [],
            },

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

        orderCouponDetailResults() {
            return this.orderCoupon.orderCouponDetails
                .filter(orderCouponDetail =>
                    found(
                        (this.get('Book', orderCouponDetail.bookId) || {}).name,
                        this.filterBookName,
                    ),
                )
                .map(orderCouponDetail => {
                    const book = this.get('Book', orderCouponDetail.bookId) || {};
                    return {
                        id: orderCouponDetail.id,
                        bookId: orderCouponDetail.bookId,
                        name: book.name,
                        count: orderCouponDetail.count,
                        coverPrice: book.coverPrice,
                        total: orderCouponDetail.count * book.coverPrice,
                    };
                });
        },

        total() {
            return this.orderCoupon.orderCouponDetails
                .map(
                    orderCouponDetail =>
                        (this.get('Book', orderCouponDetail.bookId) || {}).coverPrice * orderCouponDetail.count,
                )
                .reduce((a, b) => a + b, 0);
        },

        count() {
            return this.orderCoupon.orderCouponDetails
                .map(orderCouponDetail => orderCouponDetail.count)
                .reduce((a, b) => Number(a) + Number(b), 0);
        },
    },
    async mounted() {
        const payload = {
            name: 'OrderCoupon',
            id: this.$route.params.id,
        };
        this.orderCoupon = await this.load_by_id(payload);
        this.orderCoupon.orderCouponDetails.map(
            async orderCouponDetail =>
                await this.load_by_id({
                    name: 'Book',
                    id: orderCouponDetail.bookId,
                }),
        );
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
.admin-transaction-order-coupon-detail {
    > .left {
        > .row.title > .input.search-box {
            min-width: 400px;
        }
    }
    > .right {
        flex: 0 300px;
        max-width: 300px;
        min-width: 300px;
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
