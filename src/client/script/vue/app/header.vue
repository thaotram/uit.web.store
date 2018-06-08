<template>
    <row- id="header" 
          :debug="true"
          size="50"
          class="dark">
        <div class="full"/>
        <line-/>
        <row- class="account" 
              size="50">
            <label- :text="user.name"/>
            <image- class="round square"
                    size="30"
                    src="#"/>
        </row->
    </row->
</template>
<script>
import { mapState } from 'vuex';

export default {
    components: {
        ...'col',
        ...'row',
        ...'line',
        ...'image',
        ...'button',
        ...'label',
    },
    computed: {
        ...mapState(['user']),
    },
};
</script>
<style lang="scss">
#header {
    z-index: 1;
    @extend %dark-shadow;
    > .line {
        margin: 10px 0;
    }
    > .account {
        &:hover {
            @extend %dark-hover;
        }

        > .label {
            padding-right: 0;
            > .text {
                font-size: 15px;
            }
        }
        > .image {
            margin: 10px;
        }
    }
}
</style>
