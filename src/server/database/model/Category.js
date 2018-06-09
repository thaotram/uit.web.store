import Model from '../utils/Model';

class Category extends Model {}

Category.schema = {
    name: 'Category',
    primaryKey: 'id',

    properties: {
        id: 'int',
        name: 'string',

        bookCategory: {
            type: 'linkingObjects',
            objectType: 'Book',
            property: 'category',
        },
    },
};

export default Category;
