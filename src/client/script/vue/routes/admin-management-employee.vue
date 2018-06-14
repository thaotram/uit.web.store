<template>
    <row- class="admin admin-management-employee light" >
        <col- class="full noOverflow">
            <row- size="40" 
                  class="title">
                <button- text="Thêm nhân viên mới" 
                         icon=""
                         class="shadow round green"/>
                <s-/>
                <input- v-model="search" 
                        class="shadow search-box round"  
                        type="text"
                        icon=""
                        placeholder="Tìm kiếm"/>
            </row->
            <s- :s="20"/>
            <table-view- :size="size"
                         :has-content="employeeResults.length !== 0"
                         class="full shadow round">
                <template slot="header">
                    <table-row->
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
                                class="table-small-item">
                        <div>
                            {{ index }}
                        </div>
                        <div>
                            {{ employee.name }}
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
import { mapState, mapActions } from 'vuex';
import { toMoney, found } from '../../modules/index';

export default {
    components: {
        ...'button',
        ...'col',
        ...'markdown',
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
            search: '',
            size: [
                ['0 30px', 'end'],
                ['0 220px', 'start'],
                ['0 90px', 'end'],
                ['0 80px', 'center'],
                [0.8, 'start'],
                ['0 45px', 'end'],
            ],
        };
    },
    computed: {
        ...mapState(['app', 'data']),
        employeeResults() {
            return this.data.employees.filter(employee =>
                found(employee.name, this.search),
            );
        },
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
