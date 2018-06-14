<template>
    <transition-group name="list"
                      class="list"
                      tag="div">
        <slot/>
    </transition-group>
</template>
<script>
export default {
    components: {
        ...'line',
    },
};
</script>
<style lang="scss">
.list-enter,
.list-leave-to {
    height: 0 !important;
    min-height: 0 !important;
    opacity: 0 !important;
}
.list > * {
    transition: all 0.5s;
}
</style>