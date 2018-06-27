<template>
    <div :uid="_uid" 
         class="table-view col">
        <div class="header">
            <slot name="header"/>
        </div>
        <line-/>
        <list- class="content">
            <slot name="content"/>
        </list->
        <div :class="{visible: !hasContent}"
             class="placeholder col full">
            <div class="row">
                <slot name="placeholder"/>
            </div>
        </div>
    </div>    
</template>
<script>
import style, { initialize } from 'style';
import { getTableStyle } from './table-utils';

export default {
    components: {
        ...'line',
        ...'list',
    },
    props: {
        colSize: {
            type: Array,
            default: () => [],
        },
        hasContent: {
            type: Boolean,
            default: true,
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
            initialize({
                group: 'table',
                overwrite: true,
                style: getTableStyle(this),
            });
        },
    },
};
</script>
<style lang="scss">
.table-view {
    display: flex;
    flex-direction: column;
    font-weight: 400;
    > .header {
        background: rgba(black, 0.1);
        > .table-row > span {
            width: 12px;
        }
    }
    > .content {
        overflow-y: scroll;
    }
    > .placeholder {
        display: flex;
        flex-direction: column;
        justify-content: center;
        opacity: 0;
        &.visible {
            opacity: 0.8;
        }
        > .row {
            display: flex;
            justify-content: center;
            > * {
                border: 1px dashed rgba(0, 0, 0, 0.5);
            }
        }
    }
}
</style>
