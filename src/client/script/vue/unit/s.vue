<template>
    <div :size="s" 
         class="space full"/>
</template>
<script>
import style from 'style';
export default {
    props: {
        s: {
            type: Number,
            default: 0,
        },
    },
    mounted() {
        if (this.s !== 0) {
            style({
                [`.col > .space[size="${this.s}"], .row > .space[size="${this.s}"]`]: {
                    flex: `0 ${this.s}px`,
                },
            });
        }
    },
};
</script>
