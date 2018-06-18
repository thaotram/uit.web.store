import { Employee, User } from '../../database/database';
/**
 *
 * @param {Express.Application} app
 * @param {SocketIO.Server} io
 * @param {Realm} realm
 */
export default function(app, io, realm) {
    app.post('/api/employee/create', async (req, res) => {
        Employee.getBySessionId(req.sessionID);

        const userId = Number(req.body.userId);
        const user = User.getById(realm, userId);
        const employee = await Employee.create(realm, user, req.body.employee);
        res.send(employee.json);
    });

    app.post('/api/employee/edit', async (req, res) => {
        const employee = Employee.getById(realm, req.body.employeeId);
        await employee.update(realm, req.body.data);

        io.emit('update', 'employee');
        res.send(employee.json);
    });

    app.get('/api/employees', (req, res) => {
        Employee.getBySessionId(req.sessionID);

        const employees = realm.objects('Employee').map(employee => employee.json);
        res.json(employees);
    });
}
