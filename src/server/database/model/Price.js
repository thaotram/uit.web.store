import Model from '../utils/Model';

class Price extends Model {}

Price.schema = {
    name: 'Price',
    primaryKey: 'id',

    properties: {
        id: 'int',
        price: 'int',
        time: 'date',

        book: 'Book',
    },
};

export default Price;
