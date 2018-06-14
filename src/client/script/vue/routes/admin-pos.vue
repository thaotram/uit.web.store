<template>
    <row- class="admin admin-pos light" >
        <col- class="left full noOverflow">
            <row- size="40" 
                  class="title">
                <s-/>
                <input- v-model="search" 
                        class="shadow search-box round"  
                        type="text"
                        icon=""
                        placeholder="Tìm kiếm">
                    <dropdown- :size="40">
                        <book-search-item- v-for="book in searchResults" 
                                           :book="book"
                                           :key="book.id"
                                           @click.native="pos_add_sell_book(book)"/>
                    </dropdown->
                </input->
            </row->
            <s- :s="20"/>
            <table-view- :col-size="size"
                         :has-content="pos.sells.length !== 0"
                         class="full shadow round">
                <template slot="header">
                    <table-row- size="45">
                        <div>
                            Mã
                        </div>
                        <div>
                            Tên sản phẩm
                        </div>
                        <div>
                            Số lượng
                        </div>
                        <div>
                            Đơn giá
                        </div>
                        <div>
                            Thành tiền
                        </div>
                        <button- class="noPadding"
                                 icon=""
                                 @click.native="pos_remove_sell_books"/>
                        <span/>
                    </table-row->
                </template>
                <template slot="content">
                    <table-row- v-for="sell in pos.sells" 
                                :key="sell.book.id"
                                size="45">
                        <div>
                            {{ sell.book.id }}
                        </div>
                        <div>
                            {{ sell.book.name }}
                        </div>
                        <input v-model.number="sell.amount"
                               type="number"
                               refs="amount"
                               min="0">
                        <div>
                            {{ toMoney(sell.book.realPrice) }}
                        </div>
                        <div>
                            {{ toMoney(sell.amount * sell.book.realPrice) }}
                        </div>
                        <button- class="noPadding"
                                 icon=""
                                 @click.native="pos_remove_sell_book(sell)"/>
                    </table-row->
                </template>
                <template slot="placeholder">
                    <row- size="70">
                        <button- icon=""
                                 class="noHover"
                                 text="Không có mặt hàng nào."/>
                    </row->
                </template>
            </table-view->
        </col->
        <col- class="right noOverflow">
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
                        <p class="text">Thời gian: {{ time }}</p>
                        <s- :s="8"/>
                        <div class="row">
                            <div>Tên sách</div>
                            <div>SL</div>
                            <div>Đơn giá</div>
                            <div>Thành tiền</div>
                        </div>
                        <div class="line"/>
                        <div v-for="sell in pos.sells" 
                             :key="sell.book.id"
                             class="row">
                            <div>{{ sell.book.name }}</div>
                            <div>{{ sell.amount }}</div>
                            <div>{{ toMoney(sell.book.realPrice) }}</div>
                            <div>{{ toMoney(sell.amount * sell.book.realPrice) }}</div>
                        </div>
                        <div class="line"/>
                        <div class="row bold">
                            <div>Tổng cộng</div>
                            <div>{{ amount }}</div>
                            <div/>
                            <div>{{ toMoney(total) }}</div>
                        </div>
                    </div>
                    <s- :s="20"/>
                    <p class="text bold center">Xin cảm ơn quý khách!</p>
                </col->
            </div>
            <s- :s="20"/>
            <col- class="shadow round pay">
                <row- class="pay-row bold">
                    <span>Số lượng:</span>
                    <s-/>
                    <span class="green-text">{{ amount }}</span>
                </row->
                <row- class="pay-row bold">
                    <span>Khách phải trả:</span>
                    <s-/>
                    <span class="green-text">{{ toMoney(total) }}</span>
                </row->
                <s- :s="10"/>
                <row- size="40">
                    <button- class="full green round"
                             icon="" 
                             text="Thanh toán và in hóa đơn"
                             @click.native="payAndPrint"/>
                </row->
            </col->
        </col->
    </row->
</template>
<script>
import moment from 'moment';
import { mapState, mapMutations, mapActions } from 'vuex';
import { toMoney, found } from '../../modules/index';

export default {
    components: {
        ...'book-search-item',
        ...'button',
        ...'col',
        ...'dropdown',
        ...'input',
        ...'label',
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
            time: '',
            size: [
                ['0 80px', 'end'],
                [1, 'start'],
                ['0 70px', 'center'],
                ['0 80px', 'end'],
                ['0 80px', 'end'],
                ['0 45px', 'end'],
            ],
        };
    },
    computed: {
        ...mapState(['app', 'data', 'pos']),
        searchResults() {
            return this.data.books.filter(
                book =>
                    found(book.name, this.search) &&
                    !this.pos.sells.some(saleBook => saleBook.book.id === book.id),
            );
        },
        total() {
            return this.pos.sells
                .map(book => book.book.realPrice * book.amount)
                .reduce((a, b) => a + b, 0);
        },
        amount() {
            return this.pos.sells
                .map(book => book.amount)
                .reduce((a, b) => Number(a) + Number(b), 0);
        },
    },
    mounted() {
        setInterval(() => {
            this.time = new moment().format('hh:mm:ss DD/MM/YYYY');
        }, 100);
    },
    methods: {
        async payAndPrint() {
            await this.pos_create_cart_and_export_bill();
            this.$root.$refs.app.print(this.$refs.print);
            this.pos_remove_sell_books();
        },
        toMoney,
        ...mapMutations([
            'pos_add_sell_book',
            'pos_remove_sell_books',
            'pos_remove_sell_book',
        ]),
        ...mapActions(['pos_create_cart_and_export_bill']),
    },
};
</script>
<style lang="scss">
.admin-pos {
    > .left {
        > .row.title > .input.search-box {
            min-width: 400px;
        }
    }
    > .right {
        flex: 0 300px;
        max-width: 300px;
        min-width: 300px;
        > .report {
            overflow-x: hidden;
            overflow-y: auto;
        }
        > .pay {
            padding: 15px;
            > .pay-row {
                font-size: 15px;
                padding: 3px 2px;
            }
        }
    }
}
</style>
