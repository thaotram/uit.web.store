<template>
    <col- id="sidebar"
          :class="{fullSize: gui.fullSideBarSize}"
          size="50"
          class="dark">
        <button- icon=""
                 class="rotate"
                 text="Thu gọn"
                 @click.native="toogleSideBar()"/>
        <line-/>
        <button- :active="$route.name == `home`"
                 icon=""
                 text="Trang chủ" 
                 @click.native="$router.push(`/`)"/>
        <line-/>
        <button- :active="$route.name == `point-of-sale`"
                 icon=""
                 text="Bán hàng"
                 @click.native="$router.push(`/admin/point-of-sale`)"/>
        <div class="full"/>
        <button- icon="" 
                 text="Đăng xuất"/>
    </col->
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
    components: {
        ...'col',
        ...'row',
        ...'line',
        ...'button',
        ...'label',
        ...'image',
    },
    computed: {
        ...mapState(['user', 'gui']),
    },
    methods: {
        ...mapMutations(['toogleSideBar']),
    },
};
</script>
<style lang="scss">
#sidebar {
    z-index: 2;

    > .user > .label > .text {
        line-height: 30px;
        height: 30px;
    }
    &:not(.fullSize) {
        width: 50px;
        > .user {
            padding: 10px;
            min-height: 30px;
            > * {
                max-height: 30px;
                min-height: 30px;
                height: 30px;
            }
            > .image {
                width: 30px;
                min-width: 30px;
            }
        }
    }
    &.fullSize {
        width: $side-width;
        > .user {
            padding: 15px;
            > * {
                max-height: 50px;
                min-height: 50px;
                height: 50px;
            }
        }
        .rotate > .icon{
            transform: rotate(-180deg)
        }
    }
}
</style>
