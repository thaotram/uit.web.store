<template>
    <row- class="admin authorize-login light" >
        <col- class="left full noOverflow">
            <s- :s="60"/>
            <row- class="full">
                <s- :s="120"/>
                <col- class="shadow full round noOverflow">
                    <markdown- :value="markdown.authorize_login"
                               class="full scroll"/>
                </col->
                <s- :s="120"/>
            </row->
            <s- :s="60"/>
            <row- size="40">
                <s-/>
                <button- text="Đăng nhập với Facebook" 
                         icon=""
                         class="shadow round facebook"
                         @click.native="login"/>
                <s-/>
            </row->
            <s- :s="60"/>
        </col->
    </row->
</template>
<script>
import { mapState } from 'vuex';
import { Facebook } from '../../modules/';

export default {
    components: {
        ...'button',
        ...'col',
        ...'dropdown',
        ...'markdown',
        ...'input',
        ...'label',
        ...'line',
        ...'list',
        ...'row',
        ...'s',
        ...'table-row',
        ...'table-view',
    },
    computed: {
        ...mapState(['markdown']),
    },
    methods: {
        login() {
            Facebook.FB.login(this.$root.checkLogin);
        },
    },
};
</script>
