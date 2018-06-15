import { Supplier, Employee } from '../../database/database';
/**
 *
 * @param {Express.Application} app
 * @param {Realm} realm
 */
export default function(app, realm) {
    app.post('/api/supplier/create', async (req, res) => {
        Employee.getBySessionId(req.sessionID);

        const supplier = await Supplier.create(realm, req.body);
        res.send(supplier.json);
    });

    app.post('/api/supplier/edit', async (req, res) => {
        Employee.getBySessionId(req.sessionID);

        const supplier = Supplier.getById(realm, req.body.supplierId);
        await supplier.update(realm, req.body.data);
        res.send(supplier.json);
    });

    app.get('/api/supplier/:id', (req, res) => {
        Employee.getBySessionId(req.sessionID);

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
        Employee.getBySessionId(req.sessionID);

        const suppliers = realm.objects('Supplier').map(supplier => ({
            ...supplier.json,
            ...supplier.detail,
        }));
        res.json(suppliers);
    });
}
