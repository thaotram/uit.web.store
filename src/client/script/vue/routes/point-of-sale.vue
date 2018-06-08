<template>
    <row- class="point-of-sale light" >
        <col- class="left full">
            <row- size="40" 
                  class="title">
                <space-/>
                <input- v-model="search" 
                        type="text"
                        icon=""
                        class="search-box"
                        placeholder="Tìm kiếm">
                    <row- class="dropdown">
                        <line-/>
                        <col- class="full">
                            <row- size="40">
                                <space-/>
                            </row->
                            <col- class="result">
                                <book-search-item- v-for="book in data.books" 
                                                   :book="book"
                                                   :key="book.id"/>
                                <line- style="height: 2px"/>
                            </col->
                        </col->
                        <line-/>
                    </row->
                </input->
                <button- icon=""/>
            </row->
            <line-/>
            <!-- Khoảng trống ở dưới --> 
            <space-/>
        </col->
        <!-- <col- class="right">
        </col-> -->
    </row->
</template>
<script>
import { mapState } from 'vuex';

export default {
    components: {
        ...'col',
        ...'row',
        ...'line',
        ...'button',
        ...'label',
        ...'input',
        ...'space',
        ...'book-search-item',
    },
    data() {
        return {
            search: '',
        };
    },
    computed: {
        ...mapState(['data']),
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
            overflow: hidden;
            > .title {
                > .input.search-box {
                    min-width: 400px;
                    > .dropdown {
                        position: absolute;
                        width: 100%;
                    }
                    .result {
                        display: none;
                    }
                    &.focus {
                        > .dropdown {
                            box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
                        }
                        .result {
                            display: flex;
                        }
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
