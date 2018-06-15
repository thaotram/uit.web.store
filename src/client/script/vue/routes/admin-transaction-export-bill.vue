<template>
    <row- class="admin admin-transaction-export-bill light" >
        <col- class="full noOverflow">
            <row- size="40" 
                  class="title">
                <button- text="Thêm nhà cung cấp mới" 
                         icon=""
                         class="shadow round green"/>
                <s-/>
                <input- v-model="search" 
                        class="shadow search-box round"  
                        type="text"
                        icon=""
                        placeholder="Tìm kiếm"/>
            </row->
            <s- :s="20"/>
            <table-view- :col-size="size"
                         :has-content="exportBillResults.length !== 0"
                         class="full shadow round">
                <template slot="header">
                    <table-row- size="45">
                        <div>STT</div>
                        <div>Hóa đơn xuất</div>
                        <div>Điện thoại</div>
                        <div>Địa chỉ</div>
                        <div>Đã nhập</div>
                        <div>Tổng cộng</div>
                        <span/>
                    </table-row->
                </template>
                <template slot="content">
                    <table-row- v-for="(exportBill, index) in exportBillResults"
                                :key="exportBill.id"
                                size="45">
                        <div>
                            {{ index + 1 }}
                        </div>
                        <div>
                            {{ exportBill.name }}
                        </div>
                        <div>
                            {{ exportBill.phone }}
                        </div>
                        <div>
                            {{ exportBill.address }}
                        </div>
                        <div>
                            {{ exportBill.count }}
                        </div>
                        <div>
                            {{ toMoney(exportBill.total) }}
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
import { mapState, mapActions } from 'vuex';
import { toMoney, toDate, found, toAvatar } from '../../modules/index';

export default {
    components: {
        ...'button',
        ...'col',
        ...'markdown',
        ...'input',
        ...'label',
        ...'image',
        ...'line',
        ...'list',
        ...'row',
        ...'s',
        ...'table-row',
        ...'table-view',
    },
    data() {
        return {
            search: '',
            size: [
                ['0 30px', 'center'],
                ['0.8 220px', 'start'],
                ['0 120px', 'start'],
                ['1 280px', 'start'],
                ['0 100px', 'end'],
                ['0 100px', 'end'],
            ],
        };
    },
    computed: {
        ...mapState(['app', 'data']),
        exportBillResults() {
            return this.data.carts.filter(cart => found(cart.name, this.search));
        },
    },
    methods: {
        toDate,
        toAvatar,
        toMoney,
    },
};
</script>
<style lang="scss">
.admin-transaction-export-bill {
    > .col {
        > .row.title > .input.search-box {
            min-width: 400px;
        }
    }
}
</style>
