<template>
    <row- class="admin admin-management-user-edit light" >
        <col- class="full noOverflow">
            <row- size="40" 
                  class="title">
                <button- text="Chỉnh sửa thông tin nhân viên" 
                         icon=""
                         class="shadow round green"
                         @click.native="submit"/>
            </row->
            <s- :s="20"/>
            <col- class="full round shadow noOverflow">
                <div class="full scroll padding">
                    <div class="col">
                        <h1>Thêm nhân viên mới</h1>
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
                                <div class="row user-input"
                                     size="40">
                                    <div class="row user" 
                                         size="40">
                                        <image- :src="avatar(user.id)"
                                                class="round square border"
                                                size="30"/>
                                        <s- :s="10"/>
                                        <span class="full">
                                            {{ user.name }}
                                        </span>
                                    </div>
                                </div>
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
import { date, found, avatar, user } from '../../modules/index';

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
        employee() {
            return (
                this.data.employees.find(
                    employee => employee.id == Number(this.$route.params.id),
                ) || {
                    name: '',
                    address: '',
                    phone: '',
                    birthdate: '',
                }
            );
        },
        user() {
            return user(this.employee.userId, this);
        },
    },
    methods: {
        date,
        avatar,
        async submit() {
            await fetch('/api/employee/edit', {
                method: 'POST',
                credentials: 'same-origin',
                body: JSON.stringify({
                    employeeId: this.employee.id,
                    data: this.employee,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        },
    },
};
</script>
<style lang="scss">
.admin-management-user-edit {
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
