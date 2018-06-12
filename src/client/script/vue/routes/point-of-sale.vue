<template>
    <row- class="point-of-sale light" >
        <col- class="left full noOverflow">
            <row- size="40">
                <space-/>
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
            <space- :size="20"/>
            <table-view- :size="size"
                         :has-content="pos.sells.length !== 0"
                         class="content full shadow round">
                <template slot="header">
                    <table-row->
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
                    <book-sell-item- v-for="sell in pos.sells"
                                     :sell="sell"
                                     :key="sell.book.id"/>
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
            <col- class="shadow round full"/>
            <space- :size="20"/>
            <col- class="shadow round pay">
                <space-/>
                <row- class="pay-row bold">
                    <span>Số lượng:</span>
                    <space-/>
                    <span class="green-text">{{ amount }}</span>
                </row->
                <row- class="pay-row bold">
                    <span>Khách phải trả:</span>
                    <space-/>
                    <span class="green-text">{{ toMoney(total) }}</span>
                </row->
                <space- :size="10"/>
                <row- size="40">
                    <button- class="full green"
                             icon="" 
                             text="Thanh toán và in hóa đơn"/>
                </row->
            </col->
        </col->
    </row->
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { toMoney, found } from '../../modules/index';

export default {
    components: {
        ...'book-search-item',
        ...'book-sell-item',
        ...'button',
        ...'col',
        ...'dropdown',
        ...'input',
        ...'label',
        ...'line',
        ...'list',
        ...'row',
        ...'space',
        ...'table-row',
        ...'table-view',
    },
    data() {
        return {
            search: '',
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
        ...mapState(['data', 'pos']),
        searchResults() {
            return this.data.books.filter(
                book =>
                    found(book.name, this.search) &&
                    !this.pos.sells.some(saleBook => saleBook.book === book),
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
        this.pos_load_books();
    },
    methods: {
        toMoney,
        ...mapActions(['pos_load_books']),
        ...mapMutations(['pos_add_sell_book', 'pos_remove_sell_books']),
    },
};
</script>
<style lang="scss">
$padding: 10px;

.point-of-sale {
    padding: $padding;
    > *:not(.space) {
        &.left {
            padding: $padding;
            > .row > .input.search-box {
                min-width: 400px;
            }
        }
        &.right {
            padding: $padding;
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
    }
}

@media print {
    body * {
        visibility: hidden;
    }
    .point-of-sale,
    .point-of-sale * {
        visibility: visible;
    }
    .point-of-sale {
        position: absolute;
        left: 0;
        top: 0;
    }
}
</style>
