<template>
    <div id="app"
         class="col">
        <!-- <header-/> -->
        <!-- <line- class="dark" /> -->
        <router-view id="view"
                     ref="view" />
    </div>
</template>
<script>
export default {
    components: {},
};
</script>
<style lang="scss">
#app {
    position: absolute;
    height: 100%;
    width: 100%;
    min-width: 350px;
    background: #f2f5f7;
}
</style>