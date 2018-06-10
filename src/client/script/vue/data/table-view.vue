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
    </div>    
</template>
<script>
import { initialize } from 'style';
import { getTableStyle } from './table-utils';

export default {
    components: {
        ...'line',
        ...'list',
    },
    props: {
        size: {
            type: Array,
            default: () => [],
        },
    },
    updated() {
        initialize({
            group: 'table',
            overwrite: true,
            style: getTableStyle(this),
        });
    },
};
</script>
<style lang="scss">
.table-view {
    display: flex;
    flex-direction: column;
    > .header {
        background: #e6e6e6;
        >.table-row > span {
            width: 12px;
        }
    }
    > .content {
        overflow-y: scroll;
    }
}
</style>
