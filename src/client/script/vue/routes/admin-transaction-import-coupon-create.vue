<template>
    <row- class="admin admin-import-coupon light" >
        <col- class="left full noOverflow">
            <row- size="40" 
                  class="title">
                <s-/>
                <input- v-model="filterUserName" 
                        class="shadow search-box round"  
                        type="text"
                        icon=""
                        placeholder="Tìm kiếm">
                    <dropdown- :size="40">
                        <book-search-item- v-for="book in searchResults" 
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
                        <div>Giá mua</div>
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
                        <div>
                            {{ item.book.id }}
                        </div>
                        <div>
                            {{ item.book.name }}
                        </div>
                        <input v-model.number="item.count"
                               type="number"
                               refs="count"
                               min="0">
                        <div>
                            {{ money(item.book.coverPrice) }}
                        </div>
                        <input v-model.number="item.price"
                               type="number"
                               refs="count"
                               min="0">
                        <div>
                            {{ money(item.count * item.price) }}
                        </div>
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
                             text="Ghi phiếu nhập sách"
                             @click.native="submit"/>
                </row->
            </col->
        </col->

        <div ref="print" 
             class="shadow round full report">
            <col- class="bill">
                <row- class="header"
                      size="40">
                    <div class="logo"/>
                    <s- :s="10"/>
                    <span class="logo-text d full">{{ app.name }}</span>
                </row->
                <s- :s="5"/>
                <p class="text">- Địa chỉ: {{ app.address }}</p>
                <p class="text">- Điện thoại: {{ app.phone }}</p>
                <s- :s="8"/>
                <div class="line"/>
                <s- :s="8"/>
                <p class="text bold big center">HÓA ĐƠN BÁN LẺ</p>
                <s- :s="8"/>
                <div class="bill-table">
                    <p class="text">Thời gian: {{ time }}</p>
                    <s- :s="8"/>
                    <div class="row">
                        <div>Tên sách</div>
                        <div>SL</div>
                        <div>Giá mua</div>
                        <div>Thành tiền</div>
                    </div>
                    <div class="line"/>
                    <div v-for="item in items" 
                         :key="item.book.id"
                         class="row">
                        <div>{{ item.book.name }}</div>
                        <div>{{ item.count }}</div>
                        <div>{{ money(item.book.realPrice) }}</div>
                        <div>{{ money(item.count * item.book.realPrice) }}</div>
                    </div>
                    <div class="line"/>
                    <div class="row bold">
                        <div>Tổng cộng</div>
                        <div>{{ count }}</div>
                        <div/>
                        <div>{{ money(total) }}</div>
                    </div>
                </div>
                <s- :s="20"/>
                <p class="text bold center">Xin cảm ơn quý khách!</p>
            </col->
        </div>
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
            filterUserName: '',

            items: [],

            supplier: {
                id: null,
                name: '< Tên nhà cung cấp >',
            },
            time: '',
            size: [
                ['0 80px', 'end'],
                [1, 'start'],
                ['0 70px', 'center'],
                ['0 80px', 'end'],
                ['0 80px', 'end'],
                ['0 80px', 'end'],
                ['0 45px', 'end'],
            ],
        };
    },
    computed: {
        ...mapState(['app', 'data', 'import_coupon']),
        searchResults() {
            return this.data.Books.filter(
                book =>
                    found(book.name, this.filterUserName) &&
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
                _: 'ImportCoupon',
                supplierId: this.supplier.id,
                shipper: 'Không rõ',
                details: this.items.map(item => ({
                    bookId: item.book.id,
                    count: item.count,
                    price: item.price,
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
.admin-import-coupon {
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
