<template>
    <row- size="40" 
          class="user">
        <image- :src="avatar((u || {}).id)"
                class="round square border"
                size="30"/>
        <s- :s="10"/>
        <span class="full">
            {{ (u || {}).name }}
        </span>
    </row->    
</template>
<script>
import { avatar } from '../../modules/index';
import { mapGetters, mapActions } from 'vuex';
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
        ...'row',
        ...'s',
        ...'table-row',
        ...'table-view',
    },
    props: {
        user: {
            type: Object | undefined,
            default: () => ({}),
        },
        facebookId: {
            type: Number,
            default: null,
        },
        employeeId: {
            type: Number,
            default: null,
        },
    },
    data() {
        return {
            u: {
                id: -1,
                name: 'Khách vãng lai',
            },
        };
    },
    computed: {
        ...mapGetters(['get']),
    },
    watch: {
        facebookId() {
            this.updateUser();
        },
        employeeId() {
            this.updateUser();
        },
        user() {
            this.updateUser();
        },
    },
    async mounted() {
        this.updateUser();
    },
    methods: {
        ...mapActions(['load_by_id']),
        avatar,
        async updateUser() {
            if (typeof this.facebookId === 'number') {
                this.u = await this.load_by_id({
                    name: 'User',
                    id: this.facebookId,
                });
            } else if (typeof this.employeeId === 'number') {
                const employee = await this.load_by_id({
                    name: 'Employee',
                    id: this.employeeId,
                });
                const user = await this.load_by_id({ name: 'User', id: employee.userId });
                this.u = {
                    id: user.id,
                    name: employee.name,
                };
            } else if (
                typeof this.user.id === 'number' &&
                typeof this.user.name === 'string'
            ) {
                this.u = this.user;
            }
        },
    },
};
</script>
<style lang="scss">
.user {
    > span {
        line-height: 40px;
        font-weight: 400;
    }
}
</style>