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
                                size="60"
                                @click.native="$router.push(`/admin/transaction/export-bill/${cart.id}`)">
                        <div>{{ index + 1 }}</div>
                        <user- :facebook-id="cart.userId"/>
                        <user- :employee-id="cart.employeeId"/>
                        <div>{{ cart.timeAgo }}</div>
                        <div>{{ cart.count }}</div>
                        <div>{{ cart.total }}</div>
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
        <row- class="right">
            <div class="full shadow scroll round">
                <col- class="padding">
                    <div class="semibold">Tổng số hóa đơn: <span class="green">{{ cartResults.length }}</span></div>
                    <s- :s="15"/>
                    <div class="semibold">Tổng thu: <span class="green">{{ total }}</span></div>
                </col->
            </div>
        </row->
    </row->
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { avatar, timeAgo, money } from '../../modules/index';

export default {
    components: {
        ...'button',
        ...'col',
        ...'image',
        ...'input',
        ...'label',
        ...'line',
        ...'list',
        ...'markdown',
        ...'row',
        ...'s',
        ...'table-row',
        ...'table-view',
        ...'user',
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
        ...mapGetters(['get']),
        cartResults() {
            return this.data.Carts.filter(cart => cart.exportBill !== undefined).map(
                cart => ({
                    id: cart.id,
                    userId: cart.userId,
                    employeeId: cart.exportBill.employeeId,
                    timeAgo: timeAgo(cart.exportBill.create),
                    count: cart.exportBill.count,
                    total: cart.exportBill.total,
                }),
            );
        },
        total() {
            return money(this.cartResults.map(c => c.total).reduce((a, b) => a + b, 0));
        },
    },
    mounted() {
        this.load_all('Cart');
    },
    methods: {
        ...mapActions(['load_all']),
        avatar,
        money,
    },
};
</script>
<style lang="scss">
.admin-transaction-export-bill {
    > .right {
        flex: 0 280px;
        max-width: 280px;
        min-width: 280px;
    }
}
</style>
