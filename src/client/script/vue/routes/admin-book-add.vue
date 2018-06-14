<template>
    <row- class="admin admin-book-add light" >
        <col- class="left full noOverflow">
            <row- size="40">
                <button- text="Thêm sách mới từ đường dẫn tiki" 
                         icon=""
                         class="shadow round green"/>
                <s- :s="20"/>
                <input- class="shadow search-box round full"  
                        type="text"
                        icon=""
                        placeholder="https://tiki.com/*"/>
            </row->
            <s- :s="20"/>
            <col- class="shadow full round noOverflow">
                <markdown- :value="markdown.admin_book_add" 
                           class="full scroll"/>
            </col->
        </col->
    </row->
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { toMoney, found } from '../../modules/index';

export default {
    components: {
        ...'button',
        ...'col',
        ...'dropdown',
        ...'markdown',
        ...'input',
        ...'label',
        ...'line',
        ...'list',
        ...'row',
        ...'s',
        ...'table-row',
        ...'table-view',
    },
    computed: {
        ...mapState(['app', 'data', 'markdown']),
        bookResults() {
            return this.data.books.filter(
                book =>
                    found(book.name, this.search) &&
                    ((this.residual === -1 && book.count > 0) ||
                        (this.residual === 1 && book.count === 0) ||
                        (this.residual === 0 && true)),
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
.admin-book-add {
    > .col {
        > .row > .input.search-box {
            min-width: 400px;
        }
    }
}
</style>
