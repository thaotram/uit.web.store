<template>
    <div :style="srcStyle"
         class="image" />
</template>
<script>
import style, { getAttribute } from 'style';
export default {
    props: {
        src: {
            type: String,
            required: true,
            default: '#',
        },
    },
    computed: {
        srcStyle: function() {
            return {
                backgroundImage: `url(${this.src})`,
            };
        },
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
                [`.image.square[size="${size}"]`]: {
                    height: `${size}px`,
                    width: `${size}px`,
                    minWidth: `${size}px`,
                },
            });
        },
    },
};
</script>
<style lang="scss">
.image {
    display: block;
    margin: auto;
    background-size: cover;
    background-position: center;
    background-color: white;
    background-clip: content-box;
    background-repeat: no-repeat;
    &.square.round {
        border-radius: 50%;
    }
    &.border {
        border: 1px solid rgba(black, 0.2);
    }
}
</style>