<template>
    <row- class="admin admin-management-supplier-edit light" >
        <col- class="full noOverflow">
            <row- size="40" 
                  class="title">
                <button- text="Lưu thông tin đã thay đổi" 
                         icon=""
                         class="shadow round green"
                         @click.native="submit"/>
            </row->
            <s- :s="20"/>
            <col- class="full round shadow noOverflow">
                <div class="full scroll padding">
                    <div class="col">
                        <h1>Cập nhật thông tin nhà cung cấp</h1>
                        <s- :s="20"/>
                        <line-/>
                        <s- :s="20"/>
                        <row- class="input-color">
                            <col- size="40" 
                                  class="flex-end">
                                <button- class="shadow round green" 
                                         text="Họ và tên"/>
                                <button- class="shadow round green" 
                                         text="Địa chỉ"/>
                                <button- class="shadow round green" 
                                         text="Số điện thoại"/>
                            </col->
                            <s- :s="10"/>
                            <col- size="40" 
                                  class="full">
                                <input- v-model="supplier.name"
                                        class="shadow search-box round"
                                        type="text"
                                        placeholder="Họ và tên nhân viên"/>
                                <input- v-model="supplier.address"
                                        class="shadow search-box round"
                                        type="text"
                                        placeholder="Địa chỉ chi tiết hiện tại"/>
                                <input- v-model="supplier.phone"
                                        class="shadow search-box round"
                                        type="text"
                                        placeholder="Số di động hoặc nhà riêng"/>
                            </col->
                        </row->
                    </div>
                </div>
            </col->
        </col->
    </row->
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { date, avatar, create, update } from '../../modules/index';

export default {
    components: {
        ...'button',
        ...'col',
        ...'markdown',
        ...'dropdown',
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
            supplier: {
                id: -1,
                name: '',
                phone: '',
                address: '',
            },
            size: [
                ['0 30px', 'center'],
                ['0 220px', 'start'],
                ['0 100px', 'end'],
                ['0 120px', 'center'],
                [0.8, 'start'],
                ['0 45px', 'end'],
            ],
        };
    },
    computed: {
        ...mapState(['app', 'data']),
    },
    async mounted() {
        this.supplier = await this.load_by_id({
            name: 'Supplier',
            id: this.$route.params.id,
        });
    },
    methods: {
        ...mapActions(['load_by_id']),
        date,
        avatar,
        async submit() {
            const res = await update({
                _: 'Supplier',
                _id: this.supplier.id,
                name: this.supplier.name,
                address: this.supplier.address,
                phone: this.supplier.phone,
            });
            if (res.error) return alert(res.error);
            this.$router.push('/admin/management/supplier');
        },
    },
};
</script>
<style lang="scss">
.admin-management-supplier-edit {
    > .col {
        > .row.title > .input.search-box {
            min-width: 400px;
        }
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
    }
}
</style>
