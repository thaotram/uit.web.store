<template>
    <col- id="sidebar"
          :class="{fullSize: gui.fullSideBarSize}"
          size="50"
          class="dark">
        <button- icon=""
                 class="rotate"
                 text="Thu gọn"
                 @click.native="gui_toogleSideBar()"/>
        <line-/>
        <button- :active="is('home')"
                 icon=""
                 text="Trang chủ" 
                 @click.native="go('/')"/>
        <line-/>
        <button- :active="is('admin-pos')"
                 icon=""
                 text="Bán hàng"
                 @click.native="go('/admin/pos')"/>

        <!-- Sách -->
        <button- icon=""
                 text="Sách"
                 @click.native="go('/admin/book')"/>
        <col- :class="{show: match(/^admin-book/)}"
              size="50"
              class="indent">
            <button- :active="is('admin-book')"
                     icon=""
                     text="Danh mục sách"
                     @click.native="go('/admin/book')"/>
            <button- :active="is('admin-book-add')"
                     icon=""
                     text="Thêm sách"
                     @click.native="go('/admin/book-add')"/>
        </col->


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
        ...mapMutations(['gui_toogleSideBar']),
        go(name) {
            this.$router.push(name);
        },
        is(name) {
            return this.$route.name === name;
        },
        match(regex) {
            if (!this.$route.name) return false;
            return this.$route.name.match(regex);
        },
    },
};
</script>
<style lang="scss">
#sidebar {
    z-index: 2;

    .button:hover + .indent,
    .indent:hover,
    .indent.show {
        > .button {
            height: 50px;
            transition: all 0.4s 0s;
            opacity: 1;
        }
    }

    > .indent > .button {
        padding-left: 25px;
        min-height: 0px;
        height: 0;
        opacity: 0;
        transition: all 0.4s 0.5s;
        overflow: hidden;
    }
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
        .rotate > .icon {
            transform: rotate(-180deg);
        }
    }
}
</style>
