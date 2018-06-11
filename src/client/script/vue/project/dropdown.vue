<template>
    <row- class="dropdown">
        <col- class="full">
            <row- size="40">
                <space-/>
            </row->
            <list- class="result scrollbar-light">
                <slot/>
                <line- :key="-1"/>
            </list->
        </col->
    </row->
</template>
<script>
export default {
    components: {
        ...'col',
        ...'row',
        ...'line',
        ...'list',
        ...'space',
    },
    props: {
        size: {
            type: Number,
            required: true,
            default: 0,
        },
    },
};
</script>

<style lang="scss">
.input {
    > .dropdown {
        position: absolute;
        border-radius: 3px;
        width: 100%;
        > .col {
            overflow: hidden;
            > .result {
                z-index: 1;
                background: white;
                display: none;
                max-height: 300px;
                overflow-x: hidden;
            }
        }
    }
    &.focus > .dropdown,
    > .dropdown:hover {
        // background: red;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        > .col > .result {
            display: block;
        }
    }
}
</style>