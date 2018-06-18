<template>
    <row- class="admin admin-order-coupon light" >
        <col- class="left full noOverflow">
            <row- size="40" 
                  class="title">
                <s-/>
                <input- v-model="filterBookName" 
                        class="shadow search-box round"  
                        type="text"
                        icon=""
                        placeholder="Tìm kiếm">
                    <dropdown- :size="40">
                        <book-search-item- v-for="book in bookResults" 
                                           :book="book"
                                           :key="book.id"
                                           @click.native="add_item(book)"/>
                    </dropdown->
                </input->
            </row->
            <s- :s="20"/>
            <table-view- :col-size="size"
                         :has-content="items.length !== 0"
                         class="full shadow round">
                <template slot="header">
                    <table-row- size="45">
                        <div>Mã</div>
                        <div>Tên sản phẩm</div>
                        <div>Số lượng</div>
                        <div>Giá bìa</div>
                        <div>Thành tiền</div>
                        <button- class="noPadding"
                                 icon=""
                                 @click.native="items = []"/>
                        <span/>
                    </table-row->
                </template>
                <template slot="content">
                    <table-row- v-for="item in items" 
                                :key="item.book.id"
                                size="45">
                        <div>{{ item.book.id }}</div>
                        <div>{{ item.book.name }}</div>
                        <input v-model.number="item.count"
                               type="number"
                               refs="count"
                               min="0">
                        <div>{{ money(item.book.coverPrice) }}</div>
                        <div>{{ money(item.count * item.book.realPrice) }}</div>
                        <button- class="noPadding"
                                 icon=""
                                 @click.native="remove_item(item)"/>
                    </table-row->
                </template>
                <template slot="placeholder">
                    <row- size="70">
                        <button- icon=""
                                 class="noHover"
                                 text="Không có mặt hàng nào."/>
                    </row->
                </template>
            </table-view->
        </col->
        <col- class="right noOverflow">
            <div class="row user-input"
                 size="40">
                <input- v-model="filterSupplierName"
                        icon=""
                        class="shadow search-box round full"
                        type="text"
                        placeholder="Tên nhà cung cấp">
                    <dropdown- :size="50" 
                               class="user-dropdown">
                        <div v-for="supplier_ in supplierResults" 
                             :key="supplier_.id"
                             class="user"
                             @click="supplier = supplier_">
                            <row- size="40">
                                <s- :s="10"/>
                                <span class="full">
                                    {{ supplier_.name }}
                                </span>
                                <s- :s="10"/>
                            </row->
                        </div>
                    </dropdown->
                </input->
            </div>
            <s- :s="20"/>
            <div class="col full shadow round padding">
                <div class="row user" 
                     size="40">
                    <span class="full bold" 
                          style="line-height: 1.5em; font-size: 1.1em">
                        {{ supplier.name }}
                    </span>
                </div>
                <s- :s="10"/>
                <line-/>
                <s- :s="10"/>
                <div class="semibold">
                    Địa chỉ: {{ supplier.address }}
                </div>
                <s- :s="5"/>
                <div class="semibold">
                    Số điện thoại: {{ supplier.phone }}
                </div>
                <s- :s="10"/>
                <line-/>
                <s- :s="10"/>
                <div class="semibold">
                    Số sách đã nhập: <span class="green">{{ supplier.count }}</span>
                </div>
                <s- :s="5"/>
                <div class="semibold">
                    Đã mua: <span class="violet">{{ money(supplier.total) }}</span>
                </div>
                <s- :s="5"/>
                <div class="semibold">
                    Còn nợ: <span class="red">{{ money(supplier.loan) }}</span>
                </div>
            </div>
            <s- :s="20"/>
            <col- class="shadow round pay">
                <row- class="pay-row bold">
                    <span>Số lượng:</span>
                    <s-/>
                    <span class="green-text">{{ count }}</span>
                </row->
                <row- class="pay-row bold">
                    <span>Tổng tiền:</span>
                    <s-/>
                    <span class="green-text">{{ money(total) }}</span>
                </row->
                <s- :s="10"/>
                <row- size="40">
                    <button- class="full green round"
                             icon="" 
                             text="Ghi phiếu đặt sách"
                             @click.native="submit"/>
                </row->
            </col->
        </col->
    </row->
</template>
<script>
import moment from 'moment';
import { mapState } from 'vuex';
import { money, found, avatar, create } from '../../modules/index';

export default {
    components: {
        ...'book-search-item',
        ...'button',
        ...'col',
        ...'dropdown',
        ...'image',
        ...'input',
        ...'label',
        ...'line',
        ...'list',
        ...'row',
        ...'s',
        ...'table-row',
        ...'table-view',
    },
    data() {
        return {
            filterSupplierName: '',
            filterBookName: '',

            items: [],
            supplier: {
                id: null,
                name: '__Tên nhà cung cấp__',
            },
            time: '',
            size: [
                ['0 80px', 'end'],
                [1, 'start'],
                ['0 70px', 'center'],
                ['0 80px', 'end'],
                ['0 80px', 'end'],
                ['0 45px', 'end'],
            ],
        };
    },
    computed: {
        ...mapState(['app', 'data']),
        bookResults() {
            return this.data.Books.filter(
                book =>
                    found(book.name, this.filterBookName) &&
                    !this.items.some(item => item.book.id === book.id),
            );
        },
        supplierResults() {
            return this.data.Suppliers.filter(supplier => {
                return found(supplier.name, this.filterSupplierName);
            });
        },
        total() {
            return this.items
                .map(item => item.price * item.count)
                .reduce((a, b) => a + b, 0);
        },
        count() {
            return this.items
                .map(item => item.count)
                .reduce((a, b) => Number(a) + Number(b), 0);
        },
    },
    mounted() {
        setInterval(() => {
            this.time = new moment().format('hh:mm:ss DD/MM/YYYY');
        }, 100);
    },
    methods: {
        money,
        avatar,
        async submit() {
            const res = await create({
                _: 'OrderCoupon',
                supplierId: this.supplier.id,
                shipper: 'Không rõ',
                orderCouponDetails: this.items.map(item => ({
                    bookId: item.book.id,
                    count: item.count,
                })),
            });
            if (res.status !== 200) return alert((await res.json()).error);
            this.items = [];
        },

        add_item(book) {
            this.items.push({ book, count: 1 });
        },

        remove_item(item) {
            const index = this.items.indexOf(item);
            if (index === -1) return;
            this.items.splice(index, 1);
        },
    },
};
</script>
<style lang="scss">
.admin-order-coupon {
    > .left {
        > .row.title > .input.search-box {
            min-width: 400px;
        }
    }
    > .right {
        flex: 0 300px;
        max-width: 300px;
        min-width: 300px;
        > .pay {
            padding: 15px;
            > .pay-row {
                font-size: 15px;
                padding: 3px 2px;
            }
        }
    }
    .report {
        position: absolute;
        z-index: -1;
        visibility: hidden;
    }
}
</style>
