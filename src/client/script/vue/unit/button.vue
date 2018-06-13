<template>
    <row- :class="{ active: active }"
          class="button">
        <span v-if="icon !== ''"
              class="icon">{{ icon }}</span>
        <div v-if="text !== '' && icon === ''"
             class="br" />
        <span v-if="text !== ''"
              class="text">{{ text }}</span>
        <slot/>
        <div v-if="text !== ''"
             class="br" />
    </row->
</template>
<script>
import style, { getAttribute } from 'style';

export default {
    components: {
        ...'row',
    },
    props: {
        active: {
            type: Boolean,
            default: false,
        },
        text: {
            type: String,
            default: '',
        },
        icon: {
            type: String,
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
            const size = getAttribute('size', this, 40, true);
            style({
                [`[size="${size}"] > .button`]: {
                    minHeight: `${size}px`,
                },
                [`[size="${size}"] > .button > .br`]: {
                    width: `${size * 0.3}px`,
                },
                [`[size="${size}"] > .button > .slot`]: {
                    padding: `0 ${size * 0.3}px`,
                    fontSize: `#{($size * 0.2 + 7)}px`,
                },
                [`[size="${size}"] > .button > .icon`]: {
                    minWidth: `${size}px`,
                    minHeight: `${size}px`,
                    lineHeight: `${size}px`,
                    fontSize: `${size * 0.4}px`,
                },
                [`[size="${size}"] > .button > .text`]: {
                    lineHeight: `${size}px`,
                    fontSize: `${size * 0.2 + 7}px`,
                },
            });
        },
    },
};
</script>
<style lang="scss">
.button {
    &:not(.noHover) {
        cursor: pointer;
    }
    display: flex;
    position: relative;
    white-space: nowrap;
    > span {
        align-self: center;
        box-sizing: border-box;
        display: block;
        height: 100%;
        margin: 0;
        overflow: hidden;
        &.icon {
            text-align: center;
        }
        &.text {
            text-align: left;
            text-overflow: ellipsis;
            width: auto;
        }
    }
}

.dark .button {
    color: $dark-text-color;
}
.light .button {
    color: $light-text-color;
}

.button:not(.noHover) {
    &:hover {
        background-color: rgba(0, 0, 0, 0.25);
    }
    &:active,
    &.active,
    &.active:hover {
        background-color: rgba(0, 0, 0, 0.5);
    }
}

.button.green {
    $green: #2ecc71;
    background: $green;
    box-shadow: 0 0 5px rgba($green, 0.7);
    color: white;
    &:hover,
    &.active,
    &.active:hover {
        background-color: darken($green, 10%) !important;
    }
    &:active {
        background-color: darken($green, 20%) !important;
    }
}
</style>
