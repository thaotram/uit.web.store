<template>
    <div id="app">
        <div ref="print" 
             class="print report"/>
        <row- class="app">
            <sidebar-/>
            <col- class="full noOverflow">
                <header-/>
                <router-view id="view"
                             ref="view"
                             class="full" />
            </col->
        </row->
    </div>
</template>
<script>
export default {
    components: {
        ...'sidebar',
        ...'header',
        ...'col',
        ...'row',
    },
    methods: {
        print(components) {
            this.$refs.print.innerHTML = components.innerHTML;
            window.print();
            this.$refs.print.innerHTML = '';
        },
    },
};
</script>
<style lang="scss">
.app {
    position: absolute;
    height: 100%;
    width: 100%;
    min-width: 350px;
    background: $light-background;
    transform: translateZ(0);
    overflow: hidden;
}

@page {
    size: 5in 8in;
    margin: auto;
}

@media screen {
    #app {
        > .app {
            visibility: visible;
        }
        > .print {
            visibility: hidden;
            height: 0;
        }
    }
}

@media print {
    #app {
        > .app {
            visibility: hidden;
            height: 0;
        }
        > .print {
            visibility: visible;
            height: auto;
        }
    }
}
</style>