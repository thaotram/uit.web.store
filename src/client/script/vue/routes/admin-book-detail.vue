<template>
    <row- class="admin admin-book-detail light" >
        <col- class="left full noOverflow">
            <row- size="40">
                <button- text="Sửa thông tin sách" 
                         icon=""
                         class="shadow round green"/>
                <s- :s="20"/>
                <button- text="Cập nhật giá" 
                         icon=""
                         class="shadow round orange"
                         @click.native="updatePrice = !updatePrice"/>
                <s- :s="20"/>
                <row- :class="{hide: updatePrice}"
                      size="40"
                      class="shadow round noOverflow">
                    <input- v-model="price"
                            style="width: 200px"
                            type="number"
                            placeholder="Số tiền"/>
                    <line-/>
                    <button- icon="" 
                             class="green"
                             @click.native="submitPrice"/>
                </row->
                <s-/>
            </row->
            <s- :s="20"/>
            <col- class="shadow full round noOverflow">
                <div class="markdown-body full scroll content">
                    <div class="row one">
                        <image- :src="book.image" 
                                class="shadow round"/>
                        <s- :s="30"/>
                        <div class="full col">   
                            <div class="name bold">{{ book.name }}</div>
                            <s- :s="5"/>
                            <div class="author bold">Tác giả: {{ book.author }}</div>
                            <s- :s="10"/>
                            <line-/>
                            <s- :s="10"/>
                            <div class="bold price red">{{ money(book.realPrice) }}</div>
                            <div class="gray small semibold">
                                <span>Giảm: </span><span class="red">{{ Number((book.coverPrice - book.realPrice) / book.coverPrice * 100).toFixed(0) }}%</span>
                            </div>
                            <div class="gray small semibold">
                                <span>Giá bìa: </span><span class="violet">{{ money(book.coverPrice) }}</span>
                            </div>
                            <s- :s="10"/>
                            <line-/>
                            <s- :s="10"/>
                            <div class="small semibold">
                                Nhà phát hành: {{ book.publisher }}
                            </div>
                            <div class="small semibold">
                                Nhà xuất bản: {{ book.manufacturer }}
                            </div>
                            <div class="small semibold">
                                Kích thước: {{ book.dimensions }}
                            </div>
                            <div class="small semibold">
                                Loại bìa: {{ book.bookCover }}
                            </div>
                            <div class="small semibold">
                                Số trang: {{ book.numberOfPage }}
                            </div>
                            <div class="small semibold">
                                Ngày xuất bản: {{ book.publicationDate }}
                            </div>
                        </div>
                    </div>
                    <markdown- :value="book.description" 
                               class="description"/>
                </div>
            </col->
        </col->
    </row->
</template>
<script>
import { money } from '../../modules/';
import { mapState } from 'vuex';

export default {
    components: {
        ...'button',
        ...'col',
        ...'dropdown',
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
    },
    data() {
        return {
            price: '',
            updatePrice: false,
        };
    },
    computed: {
        book() {
            return (
                this.data.books.find(book => book.id === Number(this.$route.params.id)) ||
                {}
            );
        },
        ...mapState(['data', 'markdown']),
    },
    methods: {
        money,
        async submitPrice() {
            const res = await fetch('/api/books/price/create', {
                method: 'POST',
                credentials: 'same-origin',
                body: JSON.stringify({
                    bookId: Number(this.book.id),
                    price: Number(this.price),
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (res.status !== 200) return alert((await res.json()).error);
        },
    },
};
</script>
<style lang="scss">
.admin-book-detail {
    .content {
        padding: 40px;
    }
    .description {
        padding: 0;
        margin-top: 30px;
        img {
            margin: 15px 0;
        }
    }
    .one {
        .image {
            height: 360px;
            width: 250px;
        }

        .name {
            font-weight: bold;
            font-size: 26px;
        }

        .author {
            font-weight: bold;
            font-size: 18px;
            opacity: 0.8;
        }

        .price {
            font-weight: bold;
            font-size: 27px;
        }
        .gray {
            color: rgba(0, 0, 0, 0.5);
        }

        .small {
            font-size: 0.9em;
        }
    }
    .row.hide {
        display: none;
    }
}
</style>
