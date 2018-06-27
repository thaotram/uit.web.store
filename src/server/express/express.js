import { User } from '../database/database';

/**
 *
 * @param {Express.Application} app
 */
export default function(app) {
    app.get('/hack', async (req, res) => {
        [
            [100005458149477, 'Bùi Thị Bích Vi'],
            [100009242524526, 'Nguyễn Thị Ngọc Thảo'],
            [100000273576548, 'Phạm Bích Trâm'],
            [100004774338514, 'Dương Thùy Duyên'],
            [100007335317989, 'Trinh Phạm'],
            [100006616832661, 'Soren Tosa'],
            [100009619596108, 'Nguyễn Đức Phú'],
            [100003407330948, 'Thanh Trần'],
        ].forEach(async e => {
            await User.hack(...e);
        });
        res.json({
            log: 'Đã tạo thành công',
        });
    });
    app.get('*', (req, res) => {
        res.status(404).send('Not Found');
    });
}
