<template>
    <div class="table-row row">
        <slot/>
    </div>
</template>
<script>
import style, { getAttribute } from 'style';
export default {
    mounted() {
        const dpi = window.devicePixelRatio;
        const size = getAttribute('size', this, 40, true);
        const rowPadding = 10;
        style({
            '.table-row > *:not(:first-child)': {
                borderLeftWidth: `${1 / dpi}px`,
            },
            '.content > .table-row': {
                borderBottomWidth: `${1 / dpi}px`,
            },
            [`.table-row[size="${size}"]`]: {
                lineHeight: `${size - rowPadding * 2}px`,
            },
            [`.table-row[size="${size}"], .table-row[size="${size}"].list-enter-to, .table-row[size="${size}"].list-leave`]: {
                minHeight: `${size}px`,
                height: `${size}px`,
            },
        });
    },
};
</script>
<style lang="scss">
.table-row {
    font-size: 17px;
    display: flex;
    > div {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        box-sizing: content-box;
    }
    > input {
        outline: 0;
        border: none;
        min-width: 10px;
    }

    > div,
    input {
        &:not(.noPadding) {
            padding: 10px;
        }
        &:not(:first-child) {
            border-left-style: solid;
            border-left-color: $light-line-color;
        }
    }

    &,
    &.list-enter-to,
    &.list-leave {
        opacity: 1;
    }
    input {
        font-size: 17px;
    }
}

.content > .table-row {
    border-bottom-style: solid;
    border-bottom-color: $light-line-color;
}
</style>
