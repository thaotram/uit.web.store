<template>
    <row- class="admin admin-payment-coupon light" >
        <col- class="left full noOverflow">
            <row- size="40" 
                  class="title">
                <button- text="Ghi phiếu trả tiền nhà cung cấp" 
                         icon=""
                         class="shadow round green"
                         @click.native="submit"/>
                <s-/>
            </row->
            <s- :s="20"/>
            <col- class="full round shadow noOverflow">
                <div class="full scroll padding">
                    <div class="col">
                        <h1>Ghi phiếu trả tiền nhà cung cấp</h1>
                        <s- :s="20"/>
                        <line-/>
                        <s- :s="20"/>
                        <row- class="input-color">
                            <col- size="40" 
                                  class="flex-end">
                                <button- class="shadow round green" 
                                         text="Số tiền"/>
                                <button- class="shadow round green" 
                                         text="Nội dung"/>
                            </col->
                            <s- :s="10"/>
                            <col- size="40" 
                                  class="full">
                                <input- v-model.lazy="payment.money"
                                        class="shadow search-box round"
                                        type="money"
                                        placeholder="Số tiền"/>
                                <textarea 
                                    v-model="payment.content"
                                    class="textarea shadow round full"/>
                            </col->
                        </row->
                    </div>
                </div>
            </col->
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
                <s- :s="10"/>
                <line-/>
                <s- :s="10"/>
                <div class="bold">
                    Tiền nợ còn lại: <span class="red">{{ money(supplier.loan - Number(payment.money)) }}</span>
                </div>
            </div>
        </col->
    </row->
</template>
<script>
import moment from 'moment';
import { mapState, mapMutations } from 'vuex';
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
            supplier: {
                id: null,
                name: '__Tên nhà cung cấp__',
            },
            payment: {
                money: 0,
                content: '',
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
                ['0 45px', 'end'],
            ],
        };
    },
    computed: {
        ...mapState(['app', 'data']),
        supplierResults() {
            return this.data.Suppliers.filter(supplier => {
                return found(supplier.name, this.search_supplier);
            });
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
                supplierId: this.supplier.id,
                data: {
                    content: this.payment.content,
                    money: Number(this.payment.money),
                },
            });
            if (res.error) return alert(res.error);
            this.$router.push('/admin/transaction/payment-coupon');
        },
        ...mapMutations([
            'payment_coupon_add_payment_book',
            'payment_coupon_remove_payment_book',
            'payment_coupon_remove_payment_books',
        ]),
    },
};
</script>
<style lang="scss">
.admin-payment-coupon {
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

    .input-color {
        .col {
            > .user-input,
            > .input,
            > .button {
                margin-bottom: 10px;
            }

            .input {
                max-width: 450px;
            }

            .user {
                > span {
                    line-height: 40px;
                }
            }
        }

        .textarea {
            resize: none;
            height: 300px;
            width: 100%;
            border: none;
            background: #34495e;
            padding: 10px;
            font-size: 14px;
            color: #f1f1f1;
            box-sizing: border-box;
            &:focus {
                outline: none;
            }
        }
    }
}
</style>
