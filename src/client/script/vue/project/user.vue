<template>
    <row- size="40">
        <image- :src="avatar(eachUser.id)"
                class="round square border"
                size="30"/>
        <s- :s="10"/>
        <span class="full">
            {{ eachUser.name }}
        </span>
    </row->    
</template>
<script>
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
            type: Object,
            required: true,
            validator(user) {
                return typeof user.id === 'number' && typeof user.name === 'string';
            },
        },
    },
};
</script>