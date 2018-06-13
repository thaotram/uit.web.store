import { Supplier } from '../../database/database';

/**
 *
 * @param {Express.Application} app
 * @param {Realm} realm
 */
export default function(app, realm) {
    app.get('/api/supplier/:id', (req, res) => {
        const id = Number(req.params.id);
        const supplier = Supplier.getById(realm, id);
        if (!supplier) {
            res.json({
                error: `Không tìm thấy Nhà cung cấp có Id: ${id}`,
            });
            return;
        }
        res.json(supplier.json);
    });
    app.get('/api/suppliers', (req, res) => {
        const suppliers = realm.objects('Supplier').map(supplier => supplier.json);
        res.json(suppliers);
    });
}
