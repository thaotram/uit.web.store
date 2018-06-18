<template>
    <row- class="admin admin-management-supplier-create light" >
        <col- class="full noOverflow">
            <row- size="40" 
                  class="title">
                <button- text="Lưu thông tin đã sửa" 
                         icon=""
                         class="shadow round green"
                         @click.native="submit"/>
            </row->
            <s- :s="20"/>
            <col- class="full round shadow noOverflow">
                <div class="full scroll padding">
                    <div class="col">
                        <h1>Thêm nhà cung cấp</h1>
                        <s- :s="20"/>
                        <line-/>
                        <s- :s="20"/>
                        <row- class="input-color">
                            <col- size="40" 
                                  class="flex-end">
                                <button- class="shadow round green" 
                                         text="Tên nhà cung cấp"/>
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
                                        placeholder="Tên nhà cung cấp"/>
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
import { mapState } from 'vuex';
import { date, avatar, create } from '../../modules/index';

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
                name: '',
                address: '',
                phone: '',
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
    methods: {
        date,
        avatar,
        async submit() {
            const res = await create({
                _: 'Supplier',
                name: this.supplier.name,
                address: this.supplier.address,
                phone: this.supplier.phone,
            });
            if (res.status !== 200) return alert((await res.json()).error);
            this.$router.push('/admin/management/supplier');
        },
    },
};
</script>
<style lang="scss">
.admin-management-supplier-create {
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
