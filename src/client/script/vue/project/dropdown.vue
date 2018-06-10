<template>
    <row- class="dropdown">
        <line-/>
        <col- class="full">
            <row- size="40">
                <space-/>
            </row->
            <list- class="result scrollbar-light">
                <slot/>
                <line- :key="-1"/>0
            </list->
        </col->
        <line-/>
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
        background: white;
        position: absolute;
        width: 100%;
        > .col {
            overflow: hidden;
            > .result {
                display: none;
                max-height: 300px;
                overflow-x: hidden;
            }
        }
    }
    &.focus {
        > .dropdown {
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
            > .col > .result {
                display: block;
            }
        }
    }
}
</style>