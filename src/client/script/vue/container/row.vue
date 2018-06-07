<template>
    <div class="row">
        <slot/>
    </div>
</template>
<script>
import style, { getAttribute } from 'style';

export default {
    props: {
        debug: {
            type: Boolean,
            default: false,
        },
    },
    mounted() {
        const size = getAttribute('size', this, 40);
        style({
            [`[size="${size}"] > .row, .row[size="${size}"]`]: {
                minHeight: `${size}px`,
            },
        });
    },
};
</script>
