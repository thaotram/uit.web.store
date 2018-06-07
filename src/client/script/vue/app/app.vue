<template>
    <row- id="app">
        <sidebar-/>
        <col- class="full">
            <header-/>
            <router-view id="view"
                         ref="view"
                         class="full" />
        </col->
    </row->
</template>
<script>
export default {
    components: {
        ...'sidebar',
        ...'header',
        ...'col',
        ...'row',
    },
};
</script>
<style lang="scss">
#app {
    position: absolute;
    height: 100%;
    width: 100%;
    min-width: 350px;
    background: $light-background;
}
</style>