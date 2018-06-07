class MembershipCard {
    static getNextId(realm) {
        const items = realm.objects('MembershipCard');
        return items.length == 0 ? 1 : items.max('id') + 1;
    }
    static isValid(realm, card) {
        if (!card) {
            return false;
        }
        return (
            realm
                .objects('MembershipCard')
                .filtered(`id == ${card.id}`)[0] !==
            undefined
        );
    }
}

MembershipCard.schema = {
    name: 'MembershipCard',
    primaryKey: 'id',

    properties: {
        id: 'int',
        owner: 'User',
        employee: 'Employee',

        create: 'date',
        valid: 'bool',
    },
};

export default MembershipCard;
