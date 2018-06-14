import { Employee, User } from '../../database/database';
/**
 *
 * @param {Express.Application} app
 * @param {Realm} realm
 */
export default function(app, realm) {
    app.post('/api/employee/create', async (req, res) => {
        const userId = Number(req.body.userId);
        const user = User.getById(realm, userId);
        const employee = await Employee.create(realm, user, req.body.employee);
        res.send(employee.json);
    });
    app.post('/api/employee/edit', async (req, res) => {
        const employee = Employee.getById(realm, req.body.employeeId);
        await employee.update(realm, req.body.data);
        res.send(employee.json);
    });

    app.get('/api/employee/:id', (req, res) => {
        const id = Number(req.params.id);
        const employee = Employee.getById(realm, id);
        if (!employee) {
            res.json({
                error: `Không tìm thấy Nhà cung cấp có Id: ${id}`,
            });
            return;
        }
        res.json(employee.json);
    });
    app.get('/api/employees', (req, res) => {
        const employees = realm.objects('Employee').map(employee => employee.json);
        res.json(employees);
    });
}
