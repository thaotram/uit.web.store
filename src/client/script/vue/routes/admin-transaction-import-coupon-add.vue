<template>
    <row- class="admin admin-import-coupon light" >
        <col- class="left full noOverflow">
            <row- size="40" 
                  class="title">
                <s-/>
                <input- v-model="search" 
                        class="shadow search-box round"  
                        type="text"
                        icon=""
                        placeholder="Tìm kiếm">
                    <dropdown- :size="40">
                        <book-search-item- v-for="book in searchResults" 
                                           :book="book"
                                           :key="book.id"
                                           @click.native="import_coupon_add_buy_book(book)"/>
                    </dropdown->
                </input->
            </row->
            <s- :s="20"/>
            <table-view- :col-size="size"
                         :has-content="import_coupon.buys.length !== 0"
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
                            Giá bìa
                        </div>
                        <div>
                            Giá mua
                        </div>
                        <div>
                            Thành tiền
                        </div>
                        <button- class="noPadding"
                                 icon=""
                                 @click.native="import_coupon_remove_buy_books"/>
                        <span/>
                    </table-row->
                </template>
                <template slot="content">
                    <table-row- v-for="buy in import_coupon.buys" 
                                :key="buy.book.id"
                                size="45"
                                @click.native="import_coupon_remove_buy_book(buy)">
                        <div>
                            {{ buy.book.id }}
                        </div>
                        <div>
                            {{ buy.book.name }}
                        </div>
                        <input v-model.number="buy.count"
                               type="number"
                               refs="count"
                               min="0">
                        <div>
                            {{ money(buy.book.coverPrice) }}
                        </div>
                        <input v-model.number="buy.price"
                               type="number"
                               refs="count"
                               min="0">
                        <div>
                            {{ money(buy.count * buy.price) }}
                        </div>
                        <button- class="noPadding"
                                 icon=""
                                 @click.native="pos_remove_buy_book(buy)"/>
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
                <input- v-model="search_supplier"
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
                    <div v-for="buy in import_coupon.buys" 
                         :key="buy.book.id"
                         class="row">
                        <div>{{ buy.book.name }}</div>
                        <div>{{ buy.count }}</div>
                        <div>{{ money(buy.book.realPrice) }}</div>
                        <div>{{ money(buy.count * buy.book.realPrice) }}</div>
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
import { mapState, mapMutations, mapActions } from 'vuex';
import { money, found, avatar } from '../../modules/index';

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
            supplier: {
                id: null,
                name: '< Tên nhà cung cấp >',
            },
            search_supplier: '',
            search: '',
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
            return this.data.books.filter(
                book =>
                    found(book.name, this.search) &&
                    !this.import_coupon.buys.some(buy => buy.book.id === book.id),
            );
        },
        supplierResults() {
            return this.data.suppliers.filter(supplier => {
                return found(supplier.name, this.search_supplier);
            });
        },
        total() {
            return this.import_coupon.buys
                .map(buy => buy.price * buy.count)
                .reduce((a, b) => a + b, 0);
        },
        count() {
            return this.import_coupon.buys
                .map(buy => buy.count)
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
            const res = await fetch('/api/importCoupons/create', {
                method: 'POST',
                credentials: 'same-origin',
                body: JSON.stringify({
                    supplierId: this.supplier.id,
                    shipper: 'Không rõ',
                    importCouponDetails: this.import_coupon.buys.map(buy => ({
                        bookId: buy.book.id,
                        count: buy.count,
                        price: buy.price,
                    })),
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (res.status !== 200) return alert((await res.json()).error);
            // this.$root.$refs.app.print(this.$refs.print);
            // this.pos_remove_buy_books();
        },
        ...mapMutations([
            'import_coupon_add_buy_book',
            'import_coupon_remove_buy_book',
            'import_coupon_remove_buy_books',
        ]),
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
