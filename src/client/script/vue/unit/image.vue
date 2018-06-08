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
    // size: this.size || style.get('size', this, 40),
    mounted() {
        const size = getAttribute('size', this, 40);
        style({
            [`[size="${size}"] > .image.square, .image.square[size="${size}"]`]: {
                height: `${size}px`,
                width: `${size}px`,
                minWidth: `${size}px`,
            },
        });
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
    &.square.round {
        border-radius: 50%;
    }
}
</style>