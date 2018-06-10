<template>
    <row- class="point-of-sale light" >
        <col- class="left full noOverflow">
            <row- size="40" 
                  class="title shadow">
                <space-/>
                <input- v-model="search" 
                        type="text"
                        icon=""
                        class="search-box"
                        placeholder="Tìm kiếm">
                    <dropdown- :size="40">
                        <book-search-item- v-for="book in bookResults" 
                                           :book="book"
                                           :key="book.id"/>
                    </dropdown->
                </input->
                <button- icon=""/>
            </row->
            <space- :size="15"/>
            <table-view- :size="size"
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
                        <span/>
                    </table-row->
                </template>
                
                <template slot="content">
                    <book-sell-item- v-for="book in bookResults"
                                     :book="book"
                                     :key="book.id"/>
                </template>
               
            </table-view->
        </col->
        <col- class="right shadow"/>
    </row->
</template>
<script>
import { mapState, mapActions } from 'vuex';
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
                ['0 60px', 'end'],
                [1, 'start'],
                ['0 70px', 'start'],
                ['0 80px', 'end'],
                ['0 80px', 'end'],
            ],
        };
    },
    computed: {
        ...mapState(['data']),
        bookResults() {
            return this.data.books.filter(book => found(book.name, this.search));
        },
    },
    mounted() {
        this.loadBooks();
    },
    methods: {
        ...mapActions(['loadBooks']),
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
            > .title {
                border-radius: 3px;
                overflow: visible;
                > .input.search-box {
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
