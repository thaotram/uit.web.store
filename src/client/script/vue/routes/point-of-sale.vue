<template>
    <row- class="point-of-sale light" >
        <col- class="left full">
            <row- size="40" 
                  class="title">
                <space-/>
                <row- size="40" 
                      class="row">
                    <line-/>
                    <input- v-model="search" 
                            type="text"
                            icon=""
                            class="search-box base"
                            placeholder="Tìm kiếm"> 
                        <col- class="dropdown" 
                              @click.native="log">
                            a
                        </col->
                    </input->
                    <line-/>
                </row->
                <button- icon=""/>
            </row->
            <line-/>
            <space-/>
        </col->
        <col- class="right">
            <!--//-->
        </col->
    </row->
</template>

<script>
export default {
    components: {
        ...'col',
        ...'row',
        ...'line',
        ...'button',
        ...'label',
        ...'layer',
        ...'input',
        ...'space',
    },
    data() {
        return {
            search: '',
        };
    },
    watch: {
        search(value) {
            console.log(value);
        },
    },
};
</script>
<style lang="scss">
$padding: 15px;
.point-of-sale {
    padding: $padding;
    > * {
        box-shadow: 0 0 5px rgba(black, 0.2);
        background: white;
        border-radius: 3px;
        margin: $padding;
        &.left {
            > .title {
                > .search-box {
                    flex: 0.5;
                    &.focus > .dropdown,
                    > .dropdown:hover {
                        visibility: visible;
                    }
                    .dropdown {
                        // visibility: collapse;
                        top: calc(100% + 10px);
                        background: white;
                    }
                }
            }
        }
        &.right {
            width: 300px;
        }
    }
}
</style>
