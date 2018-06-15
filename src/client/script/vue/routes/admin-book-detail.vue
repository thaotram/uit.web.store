<template>
    <row- class="admin admin-book-detail light" >
        <col- class="left full noOverflow">
            <row- size="40">
                <button- text="Sửa thông tin sách" 
                         icon=""
                         class="shadow round green"/>
                <s- :s="20"/>
                <button- text="Cập nhật giá" 
                         icon=""
                         class="shadow round orange"/>
                <s-/>
            </row->
            <s- :s="20"/>
            <col- class="shadow full round noOverflow">
                <markdown- :value="markdown.admin_book_detail"
                           class="full scroll"/>
            </col->
        </col->
    </row->
</template>
<script>
import { mapState } from 'vuex';

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
        book() {
            return this.data.books.find(
                book => book.id === Number(this.$route.params.id),
            );
        },
        ...mapState(['data', 'markdown']),
    },
};
</script>
<style lang="scss">
</style>
