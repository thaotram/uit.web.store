<template>
    <row- class="admin authorize-login light" >
        <col- class="left full noOverflow">
            <s- :s="30"/>
            <row- class="full">
                <s- :s="30"/>
                <col- class="shadow full round noOverflow">
                    <markdown- :value="markdown.information"
                               class="full scroll"/>
                </col->
                <s- :s="30"/>
            </row->
            <s- :s="30"/>
        </col->
    </row->
</template>
<script>
import { mapState } from 'vuex';

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
};
</script>
