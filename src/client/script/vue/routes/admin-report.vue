<template>
    <row- class="admin admin-report light" >
        <col- class="full noOverflow">
            <row- class="full">
                <col- class="shadow full round noOverflow">
                    <markdown- :value="markdown.information"
                               class="full scroll"/>
                </col->
            </row->
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
