<template>
    <row- class="admin admin-management-employee-edit light" >
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
                        <h1>Cập nhật thông tin nhân viên</h1>
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
                                <button- class="shadow round green" 
                                         text="Ngày sinh"/>
                                <button- class="shadow round green" 
                                         text="Tài khoản"/>
                            </col->
                            <s- :s="10"/>
                            <col- size="40" 
                                  class="full">
                                <input- v-model="employee.name"
                                        class="shadow search-box round"
                                        type="text"
                                        placeholder="Họ và tên nhân viên"/>
                                <input- v-model="employee.address"
                                        class="shadow search-box round"
                                        type="text"
                                        placeholder="Địa chỉ chi tiết hiện tại"/>
                                <input- v-model="employee.phone"
                                        class="shadow search-box round"
                                        type="text"
                                        placeholder="Số di động hoặc nhà riêng"/>
                                <input- v-model="employee.birthdate"
                                        class="shadow search-box round"
                                        type="text"
                                        placeholder="Ngày sinh"/>
                                <user- :facebook-id="employee.userId"/>
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
import { date, avatar, update } from '../../modules/index';

export default {
    components: {
        ...'button',
        ...'col',
        ...'markdown',
        ...'dropdown',
        ...'input',
        ...'label',
        ...'image',
        ...'user',
        ...'line',
        ...'list',
        ...'row',
        ...'s',
        ...'table-row',
        ...'table-view',
    },
    data() {
        return {
            employee: { 
                name: '',
                address: '',
                phone: '',
                birthdate: '',
                userId: -1,
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
        this.employee = await this.load_by_id({
            name: 'Employee',
            id: this.$route.params.id,
        });
    },
    methods: {
        ...mapActions(['load_by_id']),
        date,
        avatar,
        // Sửa lại hàm submit này
        async submit() {
            const res = await update({
                _: 'Employee',
                _id: this.employee.id,
                name: this.employee.name,
                phone: this.employee.phone,
                address: this.employee.address,
                birthdate: this.employee.birthdate,
            });
            if (res.error) return alert(res.error);
            this.$router.push('/admin/management/employee');
        },
    },
};
</script>
<style lang="scss">
.admin-management-employee-edit {
    > .col {
        > .row.title > .input.search-box {
            min-width: 400px;
        }
    }
    .input-color {
        .col {
            > .input,
            > .button {
                margin-bottom: 10px;
            }

            .input {
                max-width: 450px;
            }
        }
    }
}
</style>
