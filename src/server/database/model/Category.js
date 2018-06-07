import Realm from 'realm';
//Thể loại
class Category {}

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
