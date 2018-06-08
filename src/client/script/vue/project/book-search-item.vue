<template>
    <col- class="book-search-item">
        <line-/>
        <row- size="40">
            <image- src="#"/>
            <col- class="full">
                <label- :text="book.name" 
                        size="25"/>
                        <!-- {{ book.name }} -->
            </col->
            <col->
                <label- text="100.000 đ" 
                        size="20"/>
                <label- text="30.000 đ" 
                        size="20"/>
            </col->
        </row->
    </col->
</template>
<script>
import style, { getAttribute } from 'style';

export default {
    components: {
        ...'row',
        ...'col',
        ...'line',
        ...'label',
        ...'image',
    },
    props: {
        book: {
            type: Object,
            required: true,
            validator(book) {
                if (typeof book.id != 'number') return false;
                if (typeof book.name != 'string') return false;

                return true;
            },
        },
    },
};
</script>
<style lang="scss">
.book-search-item {
    > .row {
        padding: 8px;
        > .image {
            height: 40px;
            background: black;
            width: 30px;
        }
    }
}
</style>
