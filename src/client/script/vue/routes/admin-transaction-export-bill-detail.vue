<template>
    <row- class="admin admin-transaction-export-bill-detail light" >
        <col- class="left full noOverflow">
            <row- size="40" 
                  class="title">
                <button- text="In hóa đơn này" 
                         icon=""
                         class="shadow round green"
                         @click.native="print"/>
                <s-/>
                <input- v-model="filterBookName" 
                        class="shadow search-box round"  
                        type="text"
                        icon=""
                        placeholder="Tìm kiếm sản phẩm trong hóa đơn"/>
            </row->
            <s- :s="20"/>
            <table-view- :col-size="size"
                         :has-content="items.length !== 0"
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
                        <span/>
                    </table-row->
                </template>
                <template slot="content">
                    <table-row- v-for="(cartDetail, index) in cart.cartDetails" 
                                :key="index"
                                size="45">
                        <div>
                            {{ cartDetail.bookId }}
                        </div>
                        <div>
                            {{ cartDetail.book }}
                        </div>
                        <div>
                            {{ cartDetail.count }}
                        </div>
                        <div>
                            <!-- {{ money(cartDetail.book.realPrice) }} -->
                        </div>
                        <div>
                            <!-- {{ money(cartDetail.count * cartDetail.book.realPrice) }} -->
                        </div>
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
                <input- v-model="filterUserName"
                        icon=""
                        class="shadow search-box round full"
                        type="text"
                        placeholder="Tên tài khoản người dùng">
                    <dropdown- :size="50" 
                               class="user-dropdown">
                        <div v-for="eachUser in userResults" 
                             :key="eachUser.id"
                             class="user"
                             @click="user = eachUser">
                            <row- size="40">
                                <image- :src="avatar(eachUser.id)"
                                        class="round square border"
                                        size="30"/>
                                <s- :s="10"/>
                                <span class="full">
                                    {{ eachUser.name }}
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
                    Điểm thưởng: {{ user.point }}
                </div>
                <s- :s="5"/>
                <div class="semibold">
                    Số sách đã mua: {{ user.count }}
                </div>
                <s- :s="5"/>
                <div class="semibold">
                    Tổng tiền đã mua: {{ money(user.total) }}
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
                        <div>Đơn giá</div>
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
import { mapState, mapGetters, mapActions } from 'vuex';
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
        ...'user',
        ...'row',
        ...'s',
        ...'table-row',
        ...'table-view',
    },
    data() {
        return {
            cart: {
                cartDetails: [],
            },

            filterBookName: '',
            filterUserName: '',

            items: [],
            user: {
                id: null,
                name: 'Khách vãng lai',
            },

            time: '',
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
        ...mapState(['app', 'data']),
        ...mapGetters(['get']),

        bookResults() {
            return this.data.Books.filter(
                book =>
                    found(book.name, this.filterBookName) &&
                    !this.items.some(item => item.book.id === book.id),
            );
        },

        userResults() {
            return [
                { id: '', name: 'Khách vãng lai' },
                ...this.data.Users.filter(user => {
                    return (
                        found(user.name, this.filterUserName) && user.id !== this.user.id
                    );
                }),
            ];
        },

        total() {
            return this.items
                .map(book => book.book.realPrice * book.count)
                .reduce((a, b) => a + b, 0);
        },

        count() {
            return this.items
                .map(book => book.count)
                .reduce((a, b) => Number(a) + Number(b), 0);
        },
    },
    async mounted() {
        setInterval(() => {
            this.time = new moment().format('hh:mm:ss DD/MM/YYYY');
        }, 100);

        const payload = {
            name: 'Cart',
            id: this.$route.params.id,
        };
        await this.load(payload);
        this.cart = this.get(payload.name, payload.id);
    },
    methods: {
        ...mapActions(['load']),
        money,
        avatar,
        async submit() {
            const res = await create({
                _: 'ExportBill',
                userId: this.user.id,
                details: this.items.map(item => ({
                    bookId: item.book.id,
                    count: item.count,
                })),
            });
            if (res.error) return alert(res.error);
            this.items = [];
        },

        print() {
            this.$root.$refs.app.print(this.$refs.print);
        },
    },
};
</script>
<style lang="scss">
.admin-transaction-export-bill-detail {
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
