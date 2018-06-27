<template>
    <row- class="admin authorize-error light" >
        <col- class="left full noOverflow">
            <s- :s="60"/>
            <row- class="full">
                <s- :s="120"/>
                <col- class="shadow full round noOverflow">
                    <markdown- :value="markdown.authorize_error"
                               class="full scroll"/>
                </col->
                <s- :s="120"/>
            </row->
            <s- :s="60"/>
            <row- size="40">
                <s-/>
                <button- text="Đăng xuất" 
                         icon=""
                         class="shadow round facebook"
                         @click.native="logout"/>
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
        logout() {
            Facebook.FB.logout(() => location.reload(true));
        },
    },
};
</script>
