<template>
    <div v-if="margin == 0"
         class="line"/>
    <div v-else 
         :margin="margin" 
         class="line"/>
</template>
<script>
import style from 'style';
export default {
    props: {
        margin: {
            type: Number,
            default: 0,
        },
    },
    mounted() {
        const dpi = window.devicePixelRatio;
        style({
            '.col > .line': {
                height: `${1 / dpi}px`,
            },
            '.row > .line': {
                width: `${1 / dpi}px`,
            },
        });
        if (this.margin !== 0) {
            style({
                [`.col > .line[margin="${this.margin}"]`]: {
                    margin: `${this.margin}px 0`,
                },
                [`.row > .line[margin="${this.margin}"]`]: {
                    margin: `0 ${this.margin}px`,
                },
            });
        }
    },
};
</script>
<style lang="scss">
.dark .line {
    background-color: $dark-line-color;
}

.light .line {
    background-color: $light-line-color;
}

.col > .line {
    width: 100%;
}
</style>
