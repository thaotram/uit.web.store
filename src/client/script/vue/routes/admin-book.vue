<template>
    <row- class="admin admin-book light" >
        <col- class="left full noOverflow">
            <row- size="40">
                <checkbox- v-model="residual" 
                           class="shadow round"
                           text="Còn hàng"/>
                <s- :s="20"/>
                <input- v-model="search" 
                        class="shadow search-box round"  
                        type="text"
                        icon=""
                        placeholder="Tìm kiếm"/>
            </row->
            <s- :s="20"/>
            <table-view- :size="size"
                         :has-content="bookResults.length !== 0"
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
                        <span/>
                    </table-row->
                </template>
                <template slot="content">
                    <table-row- v-for="book in bookResults"
                                :key="book.id"
                                class="book-item">
                        <div>
                            {{ book.id }}
                        </div>
                        <div>
                            {{ book.name }}
                        </div>
                        <div>
                            {{ book.count }}
                        </div>
                        <div>
                            {{ toMoney(book.coverPrice) }}
                        </div>
                        <div>
                            {{ toMoney(book.realPrice) }}
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
import { toMoney, found } from '../../modules/index';

export default {
    components: {
        ...'button',
        ...'checkbox',
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
            residual: true,
            time: '',
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
        bookResults() {
            return this.data.books.filter(
                book =>
                    found(book.name, this.search) && (!this.residual || book.count > 0),
            );
        },
    },
    mounted() {
        this.load_books();
    },
    methods: {
        toMoney,
        ...mapActions(['load_books']),
    },
};
</script>
<style lang="scss">
.admin-book {
    > *:not(.space) {
        &.left {
            > .row > .input.search-box {
                min-width: 400px;
            }
        }
    }
}
</style>
