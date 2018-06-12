<template>
    <col- class="book-search-item">
        <row- size="40">
            <image- :src="book.image"/>
            <col- class="full book-content">
                <p class="book-name full">
                    {{ book.name }}
                </p>
                <row- class="book-bottom">
                    <span>Còn lại: <span class="orange-text bold">{{ book.count }}</span></span>
                    <space-/>
                    <span class="green-text bold">
                        {{ toMoney(book.realPrice) }}
                    </span>
                </row->
            </col->
        </row->
    </col->
</template>
<script>
import { toMoney } from '../../modules/';
export default {
    components: {
        ...'row',
        ...'col',
        ...'line',
        ...'space',
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
    methods: {
        toMoney,
    },
};
</script>
<style lang="scss">
.book-search-item {
    &,
    * {
        cursor: pointer;
    }
    overflow: hidden;
    &:hover {
        background-color: $light-background-hover;
    }
    &:active {
        background-color: $light-background-active;
    }
    > .row {
        padding: 12px;
        overflow: hidden;
        > .image {
            height: 64px;
            flex: 0 40px;
            background-color: black;
            box-shadow: 0 0 5px rgba(black, 0.3);
            border: 3px solid white;
            border-radius: 3px;
        }
        > .book-content {
            height: 70px;
            overflow: hidden;
            padding: 0 10px;
            justify-content: center;
            > p.book-name {
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 14px;
                line-height: 22px;
                font-weight: bold;
                color: #333;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
            .book-bottom {
                font-size: 14px;
            }
        }
    }
    &.list-enter-to,
    &.list-leave {
        height: 94px;
        opacity: 1;
    }
}
</style>
