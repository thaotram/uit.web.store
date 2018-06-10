<template>
    <div class="label">
        <span class="text">{{ text }}</span>
    </div>
</template>
<script>
import style, { getAttribute } from 'style';

export default {
    components: {
        ...'row',
    },
    props: {
        text: {
            type: String | Number,
            default: '',
        },
    },
    data() {
        return {};
    },
    updated() {
        this.updateStyle();
    },
    mounted() {
        this.updateStyle();
    },
    methods: {
        updateStyle() {
            const size = getAttribute('size', this, 40);
            style({
                [`[size="${size}"] > .label, .label[size="${size}"]`]: {
                    minHeight: `${size}px`,
                    padding: `0 ${size * 0.3}px`,
                },
                [`[size="${size}"] > .label > .text, .label[size="${size}"] > .text`]: {
                    lineHeight: `${size}px`,
                    fontSize: `${size * 0.2 + 7}px`,
                },
            });
        },
    },
};
</script>
<style lang="scss">
.dark .label {
    color: $dark-text-color;
}

.light .label {
    color: $light-text-color;
}

.label {
    cursor: default;
    display: flex;
    position: relative;
    white-space: nowrap;
    > span.text {
        flex: 1;
        align-self: center;
        box-sizing: border-box;
        display: block;
        font-family: $text-font;
        height: 100%;
        margin: 0;
        overflow: hidden;
        text-align: left;
        text-overflow: ellipsis;
        width: auto;
    }
}
</style>
