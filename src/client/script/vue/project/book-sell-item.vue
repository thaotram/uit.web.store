<template>
    <table-row->
        <div>
            {{ book.id }}
        </div>
        <div>
            {{ book.name }}
        </div>
        <input v-model="count"
               type="number"
               min="0">
        <div>
            {{ toMoney(book.realPrice) }}
        </div>
        <div>
            {{ toMoney(count * book.realPrice) }}
        </div>
    </table-row->
</template>
<script>
import { toMoney } from '../../modules/index';
export default {
    components: {
        ...'table-row',
        ...'button',
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
    data() {
        return {
            count: 0,
        };
    },
    mounted() {},
    methods: {
        toMoney,
    },
};
</script>
