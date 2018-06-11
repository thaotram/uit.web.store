<template>
    <table-row- class="book-sell-item">
        <div>
            {{ sell.book.id }}
        </div>
        <div>
            {{ sell.book.name }}
        </div>
        <input v-model="sell.amount"
               type="number"
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
<script>
import { mapMutations } from 'vuex';
import { toMoney } from '../../modules/index';
export default {
    components: {
        ...'table-row',
        ...'button',
    },
    props: {
        sell: {
            type: Object,
            required: true,
            validator(sell) {
                if (typeof sell.amount !== 'number') return false;
                return true;
            },
        },
    },
    mounted() {},
    methods: {
        toMoney,
        ...mapMutations(['pos_remove_sell_book']),
    },
};
</script>
<style lang="scss">
.book-sell-item {
    input {
        font-size: 17px;
    }
    &.list-enter-to,
    &.list-leave {
        height: 45px;
        opacity: 1;
    }
}
</style>
