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

    get object() {
        const properties = this.constructor.schema.properties;
        const object = {};
        for (const property in properties) {
            if (properties.hasOwnProperty(property)) {
                if (['int', 'string', 'date'].indexOf(properties[property]) !== -1) {
                    object[property] = this[property];
                }
            }
        }
        return object;
    }
}
