<template>
    <row- class="admin admin-pos light" >
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
                                           @click.native="pos_add_sell_book(book)"/>
                    </dropdown->
                </input->
            </row->
            <s- :s="20"/>
            <table-view- :col-size="size"
                         :has-content="pos.sells.length !== 0"
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
                            Đơn giá
                        </div>
                        <div>
                            Thành tiền
                        </div>
                        <button- class="noPadding"
                                 icon=""
                                 @click.native="pos_remove_sell_books"/>
                        <span/>
                    </table-row->
                </template>
                <template slot="content">
                    <table-row- v-for="sell in pos.sells" 
                                :key="sell.book.id"
                                size="45">
                        <div>
                            {{ sell.book.id }}
                        </div>
                        <div>
                            {{ sell.book.name }}
                        </div>
                        <input v-model.number="sell.count"
                               type="number"
                               refs="count"
                               min="0">
                        <div>
                            {{ money(sell.book.realPrice) }}
                        </div>
                        <div>
                            {{ money(sell.count * sell.book.realPrice) }}
                        </div>
                        <button- class="noPadding"
                                 icon=""
                                 @click.native="pos_remove_sell_book(sell)"/>
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
                <input- v-model="search_user"
                        icon=""
                        class="shadow search-box round full"
                        type="text"
                        placeholder="Tên tài khoản người dùng">
                    <dropdown- :size="50" 
                               class="user-dropdown">
                        <div v-for="_user in userResults" 
                             :key="_user.id"
                             class="user"
                             @click="user = _user">
                            <row- size="40">
                                <image- :src="avatar(_user.id)"
                                        class="round square border"
                                        size="30"/>
                                <s- :s="10"/>
                                <span class="full">
                                    {{ _user.name }}
                                </span>
                            </row->
                        </div>
                    </dropdown->
                </input->
            </div>
            <s- :s="20"/>
            <div class="col full shadow round padding">
                <div class="row user" 
                     size="40">
                    <image- :src="avatar(user.id)"
                            class="round square border"
                            size="30"/>
                    <s- :s="10"/>
                    <span class="full semibold" 
                          style="line-height: 40px">
                        {{ user.name }}
                    </span>
                </div>
                <s- :s="15"/>
                <line-/>
                <s- :s="15"/>
                <div class="semibold">
                    Điểm thưởng: 
                </div>
                <s- :s="5"/>
                <div class="semibold">
                    Số sách đã mua: 
                </div>
                <s- :s="5"/>
                <div class="semibold">
                    Tổng tiền đã mua: 
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
                    <span>Khách phải trả:</span>
                    <s-/>
                    <span class="green-text">{{ money(total) }}</span>
                </row->
                <s- :s="10"/>
                <row- size="40">
                    <button- class="full green round"
                             icon="" 
                             text="Thanh toán và in hóa đơn"
                             @click.native="payAndPrint"/>
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
                        <div>Đơn giá</div>
                        <div>Thành tiền</div>
                    </div>
                    <div class="line"/>
                    <div v-for="sell in pos.sells" 
                         :key="sell.book.id"
                         class="row">
                        <div>{{ sell.book.name }}</div>
                        <div>{{ sell.count }}</div>
                        <div>{{ money(sell.book.realPrice) }}</div>
                        <div>{{ money(sell.count * sell.book.realPrice) }}</div>
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
            user: {
                id: null,
                name: 'Khách vãng lai',
            },
            search_user: '',
            search: '',
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
        ...mapState(['app', 'data', 'pos']),
        searchResults() {
            return this.data.books.filter(
                book =>
                    found(book.name, this.search) &&
                    !this.pos.sells.some(saleBook => saleBook.book.id === book.id),
            );
        },
        userResults() {
            return [
                {
                    id: '',
                    name: 'Khách vãng lai',
                },
                ...this.data.users.filter(user => {
                    return found(user.name, this.search_user);
                }),
            ];
        },
        total() {
            return this.pos.sells
                .map(book => book.book.realPrice * book.count)
                .reduce((a, b) => a + b, 0);
        },
        count() {
            return this.pos.sells
                .map(book => book.count)
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
        async payAndPrint() {
            const res = await fetch('/api/exportBill/createWithContent', {
                method: 'POST',
                credentials: 'same-origin',
                body: JSON.stringify({
                    employeeId: 1,
                    userId: this.user.id,
                    cartDetails: this.pos.sells.map(sell => ({
                        id: sell.book.id,
                        count: sell.count,
                    })),
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.status !== 200) return alert((await res.json()).error);

            this.$root.$refs.app.print(this.$refs.print);
            this.pos_remove_sell_books();
        },
        ...mapMutations([
            'pos_add_sell_book',
            'pos_remove_sell_books',
            'pos_remove_sell_book',
        ]),
        ...mapActions(['pos_create_cart_and_export_bill']),
    },
};
</script>
<style lang="scss">
.admin-pos {
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
