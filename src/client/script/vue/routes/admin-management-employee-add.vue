<template>
    <row- class="admin admin-management-user-add light" >
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
                        <h1>Thêm nhân viên</h1>
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
                                    <input- v-model="search"
                                            class="shadow search-box round full"
                                            type="text"
                                            placeholder="Tên tài khoản người dùng">
                                        <dropdown- :size="50" 
                                                   class="user-dropdown">
                                            <div v-for="u in userResults" 
                                                 :key="u.id"
                                                 class="user"
                                                 @click="user = u">
                                                <row- size="40">
                                                    <image- :src="avatar(u.id)"
                                                            class="round square border"
                                                            size="30"/>
                                                    <s- :s="10"/>
                                                    <span class="full">
                                                        {{ u.name }}
                                                    </span>
                                                </row->
                                            </div>
                                        </dropdown->
                                    </input->
                                    <s- :s="10"/>
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
import { date, found, avatar } from '../../modules/index';

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
            user: {
                id: null,
                name: 'Không xác định',
            },
            search: '',
            employee: {
                name: '',
                address: '',
                phone: '',
                birthdate: '',
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
        userResults() {
            return this.data.users.filter(user => found(user.name, this.search));
        },
    },
    methods: {
        date,
        avatar,
        async submit() {
            await fetch('/api/employee/create', {
                method: 'POST',
                credentials: 'same-origin',
                body: JSON.stringify({
                    userId: this.user.id,
                    employee: {
                        name: this.name,
                        birthdate: this.birthdate,
                        address: this.address,
                        phone: this.phone,
                    },
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
.admin-management-user-add {
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
