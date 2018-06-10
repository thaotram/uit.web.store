<template>
    <div :size="size" 
         class="space full"/>
</template>
<script>
import style, { getAttribute } from 'style';
export default {
    props: {
        size: {
            type: Number,
            default: 0,
        },
    },
    mounted() {
        if (this.size !== 0) {
            style({
                [`.col > .space[size="${this.size}"], .row > .space[size="${
                    this.size
                }"]`]: {
                    flex: `0 ${this.size}px`,
                },
            });
        }
    },
};
</script>
