<template>
    <div class="table-row row" 
         size="45">
        <slot/>
    </div>
</template>
<script>
import style from 'style';
export default {
    mounted() {
        const dpi = window.devicePixelRatio;
        style({
            '.table-row > *:not(:first-child)': {
                borderLeftWidth: `${1 / dpi}px`,
            },
            '.content > .table-row': {
                borderBottomWidth: `${1 / dpi}px`,
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
        line-height: 25px;
    }
    > input {
        outline: 0;
        border: none;
        min-width: 10px;
    }

    > div,
    input {
        &:not(.noPadding) {
            padding: 10px 15px;
        }
        &:not(:first-child) {
            border-left-style: solid;
            border-left-color: $light-line-color;
        }
    }
}

.content > .table-row {
    border-bottom-style: solid;
    border-bottom-color: $light-line-color;
}
</style>
