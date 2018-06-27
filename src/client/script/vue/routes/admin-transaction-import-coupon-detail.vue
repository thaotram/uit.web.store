<template>
    <row- class="admin admin-transaction-import-coupon-detail light" >
        <col- class="left full noOverflow">
            <row- size="40" 
                  class="title">
                <button- text="In hóa đơn này" 
                         icon=""
                         class="shadow round green"
                         @click.native="print"/>
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
                        <div>Đơn giá</div>
                        <div>Thành tiền</div>
                        <span/>
                    </table-row->
                </template>
                <template slot="content">
                    <table-row- v-for="importCouponDetail in importCouponDetailResults" 
                                :key="importCouponDetail.id"
                                size="45">
                        <div>{{ importCouponDetail.bookId }}</div>
                        <div>{{ (get('Book', importCouponDetail.bookId) || {}).name }}</div>
                        <div>{{ importCouponDetail.count }}</div>
                        <div>{{ money(importCouponDetail.price) }}</div>
                        <div>{{ money(importCouponDetail.price * importCouponDetail.count) }}</div>
                    </table-row->
                </template>
            </table-view->
        </col->
        <col- class="right noOverflow">
            <div class="col full shadow round padding">
                <div class="semibold">Nhân viên:</div>
                <s- :s="10"/>
                <user- :employee-id="importCoupon.employeeId"/>
                <s- :s="10"/>
                <line-/>
                <s- :s="10"/>
                <div class="semibold">Thời gian: {{ importCoupon.create }}</div>
                <s- :s="10"/>
                <div class="semibold">Người giao: {{ importCoupon.shipper }}</div>
                <s- :s="10"/>
                <div class="semibold">Người giao: {{ (get('Supplier', importCoupon.supplierId) || {}).name }}</div>
            </div>
            <s- :s="20"/>
            <col- class="shadow round pay">
                <row- class="pay-row bold">
                    <span>Số lượng:</span>
                    <s-/>
                    <span class="green-text">{{ count }}</span>
                </row->
                <row- class="pay-row bold">
                    <span>Tổng tiền:</span>
                    <s-/>
                    <span class="green-text">{{ money(total) }}</span>
                </row->
                <s- :s="10"/>
                <row- size="40">
                    <button- class="full green round"
                             icon="" 
                             text="In phiếu nhập"
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
                <s- :s="10"/>
                <p class="text">- Địa chỉ: {{ app.address }}</p>
                <s- :s="5"/>
                <p class="text">- Điện thoại: {{ app.phone }}</p>
                <s- :s="10"/>
                <div class="line"/>
                <s- :s="10"/>
                <p class="text bold big center">PHIẾU NHẬP</p>
                <s- :s="10"/>
                <div class="bill-table">
                    <p class="text"><span class="bold">Thời gian: </span>{{ importCoupon.create }}</p>
                    <div style="height: 5px"/>
                    <p class="text"><span class="bold">Nhà cung cấp: </span>{{ (get('Supplier', importCoupon.supplierId) || {}).name }}</p>
                    <div style="height: 5px"/>
                    <div class="row">
                        <div>Tên sách</div>
                        <div>SL</div>
                        <div>Đơn giá</div>
                        <div>Thành tiền</div>
                    </div>
                    <div class="line" 
                         style="margin: 3px 0"/>
                    <div v-for="(importCouponDetail, index) in importCoupon.importCouponDetails" 
                         :key="index"
                         style="margin-bottom: 3px"
                         class="row">
                        <div>{{ (get('Book', importCouponDetail.bookId) || {}).name }}</div>
                        <div>{{ importCouponDetail.count }}</div>
                        <div>{{ money(importCouponDetail.price) }}</div>
                        <div>{{ money(importCouponDetail.count * importCouponDetail.price) }}</div>
                    </div>
                    <div class="line" 
                         style="margin: 3px 0"/>
                    <div class="row bold">
                        <div>Tổng cộng</div>
                        <div>{{ count }}</div>
                        <div/>
                        <div>{{ money(total) }}</div>
                    </div>
                </div>
                <s- :s="20"/>
                <row- size="40" 
                      class="sign">
                    <s- :s="20"/>
                    <span>Người lập phiếu</span>
                    <s-/>
                    <span>Người giao</span>
                    <s- :s="20"/>
                </row->
                <s- :s="20"/>
                <row- size="40" 
                      class="sign">
                    <s- :s="20"/>
                    <span>{{ (get('Employee', importCoupon.employeeId) || {}).name }}</span>
                    <s-/>
                    <span>{{ importCoupon.shipper }}</span>
                    <s- :s="20"/>
                </row->
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
            importCoupon: {
                importCouponDetails: [],
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
                ['0 90px', 'end'],
                ['0 100px', 'end'],
            ],
        };
    },
    computed: {
        ...mapState(['app', 'data']),
        ...mapGetters(['get']),

        importCouponDetailResults() {
            return this.importCoupon.importCouponDetails.filter(importCouponDetail =>
                found(
                    (this.get('Book', importCouponDetail.bookId) || {}).name,
                    this.filterBookName,
                ),
            );
        },

        total() {
            return this.importCoupon.importCouponDetails
                .map(
                    importCouponDetail =>
                        importCouponDetail.price * importCouponDetail.count,
                )
                .reduce((a, b) => a + b, 0);
        },

        count() {
            return this.importCoupon.importCouponDetails
                .map(importCouponDetail => importCouponDetail.count)
                .reduce((a, b) => Number(a) + Number(b), 0);
        },
    },
    async mounted() {
        this.importCoupon = await this.load_by_id({
            name: 'ImportCoupon',
            id: this.$route.params.id,
        });
        this.importCoupon.importCouponDetails.map(
            async importCouponDetail =>
                await this.load_by_id({
                    name: 'Book',
                    id: importCouponDetail.bookId,
                }),
        );
        await this.load_by_id({
            name: 'Supplier',
            id: this.importCoupon.supplierId,
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
.admin-transaction-import-coupon-detail {
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
