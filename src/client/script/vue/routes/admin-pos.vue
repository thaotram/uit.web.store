<template>
    <row- class="admin admin-pos light" >
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
                            {{ money(item.book.realPrice) }}
                        </div>
                        <div>
                            {{ money(item.count * item.book.realPrice) }}
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
                <input- v-model="filterUserName"
                        icon=""
                        class="shadow search-box round full"
                        type="text"
                        placeholder="Tên tài khoản người dùng">
                    <dropdown- :size="50"
                               class="user-dropdown">
                        <user- v-for="(u, index) in userResults" 
                               :user="u" 
                               :key="index"
                               class="user"
                               @click.native="user = u"/>
                    </dropdown->
                </input->
            </div>
            <s- :s="20"/>
            <div class="col full shadow round padding">
                <user- :user="user"/>
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
import { mapState, mapActions } from 'vuex';
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
        ...'user',
    },
    data() {
        return {
            filterBookName: '',
            filterUserName: '',

            items: [],
            user: {
                id: -1,
                name: 'Khách vãng lai',
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

        userResults() {
            return [
                { id: -1, name: 'Khách vãng lai' },
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
    mounted() {
        setInterval(() => {
            this.time = new moment().format('hh:mm:ss DD/MM/YYYY');
        }, 100);
        this.load_all('Book');
        this.load_all('User');
    },
    methods: {
        ...mapActions(['load_all']),
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
            this.$root.$refs.app.print(this.$refs.print);
            this.items = [];
        },

        add_item(book) {
            const index = this.items.findIndex(item => item.book === book);
            if (index !== -1) return;
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
