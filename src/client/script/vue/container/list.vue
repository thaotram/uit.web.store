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
    transition: height 0.3s, min-height 0.3s, opacity 0.3s, background-color 0.1s;
    // transition: all 0.5s;
}
</style>