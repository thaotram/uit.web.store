<template>
    <row- class="admin admin-management-employee light" >
        <col- class="full noOverflow">
            <row- size="40" 
                  class="title">
                <button- text="Thêm nhân viên mới" 
                         icon=""
                         class="shadow round green"
                         @click.native="$router.push('/admin/management/employee/create')"/>
                <s-/>
                <input- v-model="filterUserName" 
                        class="shadow search-box round"  
                        type="text"
                        icon=""
                        placeholder="Tìm kiếm"/>
            </row->
            <s- :s="20"/>
            <table-view- :col-size="size"
                         :has-content="employeeResults.length !== 0"
                         class="full shadow round">
                <template slot="header">
                    <table-row- size="45">
                        <div>
                            STT
                        </div>
                        <div>
                            Nhân viên
                        </div>
                        <div>
                            Điện thoại
                        </div>
                        <div>
                            Ngày sinh
                        </div>
                        <div>
                            Địa chỉ
                        </div>
                        <span/>
                    </table-row->
                </template>
                <template slot="content">
                    <table-row- v-for="(employee, index) in employeeResults"
                                :key="employee.id"
                                size="60"
                                @click.native="$router.push(`/admin/management/employee/edit/${employee.id}`)">
                        <div>
                            {{ index + 1 }}
                        </div>
                        <div class="row">
                            <image- :src="avatar(employee.userId)"
                                    class="round square border"
                                    size="30"/>
                            <s- :s="10"/>
                            <span class="full">
                                {{ employee.name }}
                            </span>
                        </div>
                        <div>
                            {{ employee.phone }}
                        </div>
                        <div>
                            {{ employee.birthdate }}
                        </div>
                        <div>
                            {{ employee.address }}
                        </div>
                    </table-row->
                </template>
                <template slot="placeholder">
                    <row- size="70">
                        <button- icon=""
                                 class="noHover"
                                 text="Không có kết quả nào khớp với kết quả tìm kiếm."/>
                    </row->
                </template>
            </table-view->
        </col->
    </row->
</template>
<script>
import { mapState } from 'vuex';
import { date, found, avatar } from '../../modules/index';

export default {
    components: {
        ...'button',
        ...'col',
        ...'markdown',
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
            filterUserName: '',
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
        employeeResults() {
            return this.data.Employees.filter(employee =>
                found(employee.name, this.filterUserName),
            );
        },
    },
    methods: {
        date,
        avatar,
    },
};
</script>
<style lang="scss">
.admin-management-employee {
    > .col {
        > .row.title > .input.search-box {
            min-width: 400px;
        }
    }
}
</style>
