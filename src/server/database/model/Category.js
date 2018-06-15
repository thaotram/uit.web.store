import Model from '../utils/Model';

class Category extends Model {}

Category.schema = {
    name: 'Category',
    primaryKey: 'id',

    properties: {
        id: 'int',
        name: 'string',

        books: {
            type: 'linkingObjects',
            objectType: 'Book',
            property: 'categories',
        },
    },
};

export default Category;
