<template>
    <row- class="admin admin-user light" >
        <col- class="full noOverflow">
            <row- size="40" 
                  class="title">
                <s-/>
                <three-selector- v-model="isBuy" 
                                 right="Chưa mua"
                                 left="Đã mua"/>
                <s- :s="10"/>
                <input- v-model="search" 
                        class="shadow search-box round"  
                        type="text"
                        icon=""
                        placeholder="Tìm kiếm"/>
            </row->
            <s- :s="20"/>
            <table-view- :col-size="size"
                         :has-content="userResults.length !== 0"
                         class="full shadow round">
                <template slot="header">
                    <table-row- size="45">
                        <div>
                            STT
                        </div>
                        <div>
                            Người dùng
                        </div>
                        <div>
                            Điểm tích lũy
                        </div>
                        <div>
                            Số sách
                        </div>
                        <div>
                            Tổng cộng
                        </div>
                        <span/>
                    </table-row->
                </template>
                <template slot="content">
                    <table-row- v-for="(user, index) in userResults"
                                :key="user.id"
                                size="60">
                        <div>
                            {{ index + 1 }}
                        </div>
                        <div class="row">
                            <image- :src="avatar(user.id)"
                                    class="round square border"
                                    size="30"/>
                            <s- :s="10"/>
                            <span class="full">
                                {{ user.name }}
                            </span>
                        </div>
                        <div>
                            {{ user.point }}
                        </div>
                        <div>
                            {{ user.count }}
                        </div>
                        <div>
                            {{ money(user.total) }}
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
        <col- class="right">
            <col- class="full shadow noOverflow round">
                <markdown- :value="markdown.admin_user" 
                           class="full scroll"/> 
            </col->
        </col->
    </row->
</template>
<script>
import { mapState } from 'vuex';
import { money, found, avatar } from '../../modules/index';

export default {
    components: {
        ...'button',
        ...'checkbox',
        ...'col',
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
        ...'three-selector',
    },
    data() {
        return {
            search: '',
            isBuy: 0,
            size: [
                ['0 30px', 'center'],
                ['1 220px', 'start'],
                ['0 100px', 'end'],
                ['0 80px', 'center'],
                ['0 120px', 'end'],
            ],
        };
    },
    computed: {
        ...mapState(['app', 'data', 'markdown']),
        userResults() {
            return this.data.users.filter(
                user =>
                    found(user.name, this.search) &&
                    ((this.isBuy === -1 && user.count > 0) ||
                        (this.isBuy === 1 && user.count === 0) ||
                        (this.isBuy === 0 && true)),
            );
        },
    },
    methods: {
        money,
        avatar,
    },
};
</script>
<style lang="scss">
.admin-user {
    > .col {
        > .row.title > .input.search-box {
            min-width: 400px;
        }
    }
    > .right {
        flex: 0 500px;
        max-width: 500px;
        min-width: 500px;
    }
}
</style>
