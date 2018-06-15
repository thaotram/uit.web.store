import moment from 'moment';

export default class Model {
    /**
     * @param {*} realm
     * @param {Model} instance
     */
    static has(realm, instance) {
        if (!instance) return false;
        if (instance instanceof this === false) return false;

        return (
            realm.objects(this.schema.name).filtered(`id == ${instance.id}`)[0] !==
            undefined
        );
    }

    /**
     * @param {Realm} realm
     */
    static getNextId(realm) {
        const items = realm.objects(this.schema.name);
        return items.length == 0 ? 1 : items.max('id') + 1;
    }

    /**
     *
     * @param {Realm} realm
     * @param {Number} id
     * @returns {Realm.Object}
     */
    static getById(realm, id) {
        return realm.objects(this.schema.name).filtered('id == $0', id)[0];
    }

    /**
     *
     * @param {Realm} realm
     * @param {Object} data
     * @param {Boolean} overwrite
     */
    static write(realm, overwrite = false, data) {
        return new Promise(async (resolve, reject) => {
            try {
                realm.write(() =>
                    resolve(realm.create(this.schema.name, data, overwrite)),
                );
            } catch (e) {
                reject(e);
            }
        });
    }

    get object() {
        const properties = this.constructor.schema.properties;
        const object = {};
        for (const property in properties) {
            if (properties.hasOwnProperty(property)) {
                if (['int', 'string'].indexOf(properties[property]) !== -1) {
                    object[property] = this[property];
                }
                if (properties[property] === 'date') {
                    object[property] = moment(this[property]).format(
                        'hh:mm:ss DD-MM-YYYY',
                    );
                }
            }
        }
        return object;
    }
}
