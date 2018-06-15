<template>
    <row- class="admin admin-book-add light" >
        <col- class="left full noOverflow">
            <row- size="40">
                <button- text="Thêm sách mới từ đường dẫn tiki" 
                         icon=""
                         class="shadow round green"
                         @click.native="submit"/>
                <s- :s="20"/>
                <input- v-model="url"
                        class="shadow round full"
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
    data() {
        return {
            url: '',
        };
    },
    computed: {
        ...mapState(['markdown']),
    },
    methods: {
        submit() {
            fetch('/api/books/tiki', {
                method: 'POST',
                credentials: 'same-origin',
                body: JSON.stringify({
                    url: this.url,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        },
    },
};
</script>
<style lang="scss">
</style>
