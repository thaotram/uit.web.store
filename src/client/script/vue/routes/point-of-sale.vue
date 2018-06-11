<template>
    <row- class="point-of-sale light" >
        <col- class="left full noOverflow">
            <row- size="40">
                <space-/>
                <input- v-model="search" 
                        class="shadow search-box"  
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
            <space- :size="15"/>
            <table-view- :size="size"
                         :has-content="pos.books.length !== 0"
                         class="content full shadow">
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
                    <book-sell-item- v-for="sell in pos.books"
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
        <col- class="right noOverflow"/>
    </row->
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { found } from '../../modules/index';

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
                    !this.pos.books.some(saleBook => saleBook.book === book),
            );
        },
    },
    mounted() {
        this.pos_load_books();
    },
    methods: {
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
            > .row {
                > .input.search-box {
                    border-radius: 3px;
                    min-width: 400px;
                }
            }
            > .content {
                overflow: hidden;
                border-radius: 3px;
            }
        }
        &.right {
            margin: $padding;
            border-radius: 3px;
            flex: 0 300px;
            max-width: 300px;
            min-width: 300px;
        }
    }
}
</style>
