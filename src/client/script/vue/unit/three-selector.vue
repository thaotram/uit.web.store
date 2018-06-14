<template>
    <row- class="three-selector">
        <div :class="{ active: value === -1 }"
             class="text shadow"
             @click="updateValue(-1)">
            {{ left }}
        </div>
        <div class="middle">
            <div :class="{ active: value === 0 }"
                 class="shadow"
                 @click="updateValue(0)"/>
        </div>
        <div :class="{ active: value === 1 }"
             class="text shadow"
             @click="updateValue(1)">
            {{ right }}
        </div>
    </row->
</template>
<script>
import { getAttribute, initialize } from 'style';

export default {
    components: {
        ...'row',
    },
    props: {
        value: {
            type: Number,
            default: undefined,
            validator(value) {
                return [-1, 0, 1].indexOf(value) !== -1;
            },
        },
        left: {
            type: String,
            default: '',
        },
        right: {
            type: String,
            default: '',
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
            const size = getAttribute('size', this, 40, true);
            initialize({
                overwrite: true,
                style: {
                    [`[size="${size}"] > .three-selector`]: {
                        minHeight: `${size}px`,
                    },
                    [`[size="${size}"] > .three-selector > .middle`]: {
                        width: `${size * 0.5}px`,
                    },
                    [`[size="${size}"] > .three-selector > .middle > div`]: {
                        left: `${-size / 8}px`,
                        right: `${-size / 8}px`,
                        top: `${size / 8}px`,
                        bottom: `${size / 8}px`,
                    },
                    [`[size="${size}"] > .three-selector > .text`]: {
                        lineHeight: `${size}px`,
                        fontSize: `${size * 0.2 + 7}px`,
                        padding: `0 ${size * 0.4}px`,
                    },
                },
            });
        },
        updateValue(value) {
            this.$emit('input', value);
        },
    },
};
</script>
<style lang="scss">
.three-selector {
    display: flex;
    white-space: nowrap;
    > .text {
        background: white;
        border-radius: 3px;
    }
    > .middle {
        position: relative;
        > div {
            background: white;
            position: absolute;
            border-radius: 3px;
            margin: auto;
        }
    }

    .active {
        background: $color !important;
        color: white;
        z-index: 1;
    }

    .shadow:hover {
        background: mix($color, #fff, 20%);
    }
}
</style>
