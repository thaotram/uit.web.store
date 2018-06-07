<template>
    <div class="layer">
        <slot/>
    </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
// .base là thành phần nằm bên trong layer, quyết định kích thước của layers
// .full là thành phần nằm trong layer, có kích thước được resize khớp với kích thước của toàn layer
.layer {
    position: relative;
    > *:not(.base) {
        position: absolute;
    }
    > .full {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
    }
}
</style>
