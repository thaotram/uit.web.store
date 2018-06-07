<template>
    <div class="col">
        <slot/>
    </div>
</template>
<script>
import style, { getAttribute } from 'style';

export default {
    updated() {
        const size = getAttribute('size', this, 40);
        style({
            rules: {
                [`[size="${size}"] > .col, .col[size="${size}"]`]: {
                    minWidth: `${size}px`,
                },
            },
        });
    },
};
</script>
<style lang="scss">
.col {
    flex-direction: column;
}
</style>
