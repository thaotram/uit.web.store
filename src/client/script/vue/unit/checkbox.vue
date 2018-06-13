<template>
    <row- :class="{ active: value }" 
          class="checkbox"
          @click.native="updateValue">
        <div class="check">
            <div/>
        </div>
        <div v-if="text !== ''" 
             class="text">
            {{ text }}
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
            type: Boolean,
            default: false,
        },
        text: {
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
                    [`[size="${size}"] > .checkbox`]: {
                        minHeight: `${size - 4}px`,
                    },
                    [`[size="${size}"] > .checkbox > .check`]: {
                        width: `${size - 4}px`,
                    },
                    [`[size="${size}"] > .checkbox > .text`]: {
                        lineHeight: `${size - 4}px`,
                        fontSize: `${size * 0.2 + 7}px`,
                        paddingRight: `${size * 0.3}px`,
                    },
                },
            });
        },
        updateValue() {
            this.$emit('input', !this.value);
        },
    },
};
</script>
<style lang="scss">
.checkbox {
    border-color: transparent;
    border-style: solid;
    border-width: 2px;
    display: flex;
    position: relative;
    white-space: nowrap;
    > .check {
        display: flex;
        > div {
            margin: auto;
            width: calc(50% - 4px);
            height: calc(50% - 4px);
            border: 2px solid $color;
            border-radius: 3px;
        }
    }
}

.checkbox:not(.noHover) {
    &:hover {
        border-color: $color;
    }
    &.active > .check > div {
        background-color: $color;
    }
    &:active > .check > div {
        background-color: rgba($color, 0.5);
    }
}
</style>
