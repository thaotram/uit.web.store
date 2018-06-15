<template>
    <row- class="admin admin-transaction-export-bill light" >
        <col- class="full noOverflow">
            <row- size="40" 
                  class="title">
                <button- text="Lập hóa đơn" 
                         icon=""
                         class="shadow round green"
                         @click.native="$router.push('/admin/pos')"/>
            </row->
            <s- :s="20"/>
            <table-view- :col-size="size"
                         :has-content="cartResults.length !== 0"
                         class="full shadow round">
                <template slot="header">
                    <table-row- size="45">
                        <div>STT</div>
                        <div>Người mua</div>
                        <div>Nhân viên</div>
                        <div>Thời gian</div>
                        <div>Số lượng</div>
                        <div>Thành tiền</div>
                        <span/>
                    </table-row->
                </template>
                <template slot="content">
                    <table-row- v-for="(cart, index) in cartResults"
                                :key="cart.id"
                                size="60">
                        <div>
                            {{ index + 1 }}
                        </div>
                        <div class="row">
                            <image- :src="avatar(cart.userId)"
                                    class="round square border"
                                    size="30"/>
                            <s- :s="10"/>
                            <span class="full">
                                {{ user(cart.userId).name }}
                            </span>
                        </div>
                        <div class="row">
                            <image- :src="avatar(employee(cart.exportBill.employeeId).id)"
                                    class="round square border"
                                    size="30"/>
                            <s- :s="10"/>
                            <span class="full">
                                {{ employee(cart.exportBill.employeeId).name }}
                            </span>
                        </div>
                        <div>
                            {{ timeAgo(cart.exportBill.create) }}
                        </div>
                        <div>
                            {{ cart.exportBill.count }}
                        </div>
                        <div>
                            {{ money(cart.exportBill.total) }}
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
import { avatar, timeAgo, money, user, employee } from '../../modules/index';

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
            size: [
                ['0 30px', 'center'],
                ['1 220px', 'start'],
                ['1 220px', 'start'],
                ['0 170px', 'end'],
                ['0 100px', 'end'],
                ['0 150px', 'end'],
            ],
        };
    },
    computed: {
        ...mapState(['app', 'data']),
        cartResults() {
            return this.data.carts.filter(cart => cart.exportBill !== undefined);
        },
    },
    methods: {
        avatar,
        timeAgo,
        money,
        user,
        employee,
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
