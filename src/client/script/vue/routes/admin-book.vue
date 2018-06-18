<template>
    <row- class="admin admin-book light" >
        <col- class="full noOverflow">
            <row- size="40" 
                  class="title">
                <button- text="Thêm sách mới"  
                         icon="" 
                         class="shadow round green"
                         @click.native="$router.push('/admin/book/add')"/>
                <s-/>
                <three-selector- v-model="filterResidual" 
                                 right="Hết hàng"
                                 left="Còn hàng"/>
                <s- :s="20"/>
                <input- v-model="filterName" 
                        class="shadow search-box round"  
                        type="text"
                        icon=""
                        placeholder="Tìm kiếm"/>
            </row->
            <s- :s="20"/>
            <table-view- :col-size="size"
                         :has-content="bookResults.length !== 0"
                         class="full shadow round">
                <template slot="header">
                    <table-row- size="45">
                        <div>
                            Mã
                        </div>
                        <div>
                            Tên sản phẩm
                        </div>
                        <div>
                            Số lượng
                        </div>
                        <div>
                            Giá bán
                        </div>
                        <div>
                            Giá bìa
                        </div>
                        <span/>
                    </table-row->
                </template>
                <template slot="content">
                    <table-row- v-for="book in bookResults"
                                :key="book.id"
                                size="45"
                                @click.native="$router.push(`/admin/book/detail/${book.id}`)">
                        <div>
                            {{ book.id }}
                        </div>
                        <div>
                            {{ book.name }}
                        </div>
                        <div>
                            {{ book.count }}
                        </div>
                        <div>
                            {{ money(book.realPrice) }}
                        </div>
                        <div>
                            {{ money(book.coverPrice) }}
                        </div>
                    </table-row->
                </template>
                <template slot="placeholder">
                    <row- size="70">
                        <button- icon=""
                                 class="noHover"
                                 text="Không có kết quả nào khớp với kết quả tìm kiếm."/>
                    </row->
                </template>
            </table-view->
        </col->
    </row->
</template>
<script>
import { mapState } from 'vuex';
import { money, found } from '../../modules';

export default {
    components: {
        ...'button',
        ...'col',
        ...'dropdown',
        ...'input',
        ...'label',
        ...'line',
        ...'list',
        ...'row',
        ...'s',
        ...'table-row',
        ...'table-view',
        ...'three-selector',
    },
    data() {
        return {
            filterName: '',
            filterResidual: 0,

            items: [],
            size: [
                ['0 80px', 'end'],
                [1, 'start'],
                ['0 70px', 'center'],
                ['0 80px', 'end'],
                ['0 80px', 'end'],
            ],
        };
    },
    computed: {
        ...mapState(['data']),
        bookResults() {
            return this.data.Books.filter(
                book =>
                    found(book.name, this.filterName) &&
                    ((this.filterResidual === -1 && book.count > 0) ||
                        (this.filterResidual === 1 && book.count === 0) ||
                        (this.filterResidual === 0 && true)),
            );
        },
    },
    methods: {
        money,
    },
};
</script>
<style lang="scss">
.admin-book {
    > .col {
        > .row.title > .input.search-box {
            min-width: 400px;
        }
    }
}
</style>
