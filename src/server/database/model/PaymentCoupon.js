import moment from 'moment';
import { db, Employee, Supplier } from '../database';
import Model from '../utils/Model';
import { isContentValid, isMoney } from '../utils/Validation';

class PaymentCoupon extends Model {
    static isRawValid(paymentCoupon) {
        isContentValid(paymentCoupon.content);
        isMoney(paymentCoupon.money);
    }

    /**
     * @param {Employee} employee
     * @param {Supplier} supplier
     * @param {PaymentCoupon} paymentCoupon
     *
     */
    static async create(supplier, employee, paymentCoupon) {
        PaymentCoupon.isRawValid(paymentCoupon);
        if (!Supplier.has(supplier) || !Employee.has(employee)) {
            throw `Nhân viên hoặc nhà cung cấp không tồn tại`;
        }
        return await PaymentCoupon.write({
            id: PaymentCoupon.nextId,
            supplier: supplier,
            employee: employee,
            content: paymentCoupon.content,
            money: paymentCoupon.money,
            create: new Date(),
        });
    }

    /**
     * @param {import('../interface').QueryPaymentCoupon} query
     * @return {Promise<Realm.Results<PaymentCoupon>>}
     */
    static async queryPaymentCoupon(query) {
        let paymentCoupons = db.realm.objects('PaymentCoupon');
        if (query.hasOwnProperty('employeeId')) {
            paymentCoupons = paymentCoupons.filtered(
                'employee.id == $0',
                query.employeeId,
            );
        }
        if (query.hasOwnProperty('supplierId')) {
            paymentCoupons = paymentCoupons.filtered(
                'supplier.id == $0',
                query.supplierId,
            );
        }
        if (query.hasOwnProperty('begin')) {
            const begin = moment(query.begin, 'DD-MM-YYYY').toDate();
            paymentCoupons = paymentCoupons.filtered('create >= $0', begin);
        }
        if (query.hasOwnProperty('end')) {
            const end = moment(query.end, 'DD-MM-YYYY').toDate();
            paymentCoupons = paymentCoupons.filtered('create >= $0', end);
        }
        return paymentCoupons;
    }

    /**
     * @param {SocketIO.Server} io
     */
    notification(io) {
        io.emit('push', {
            name: PaymentCoupon.schema.name,
            data: this.json,
        });
        io.emit('update', {
            name: Supplier.schema.name,
            data: this.supplier.json,
        });
        io.emit('update', {
            name: Employee.schema.name,
            data: this.employee.json,
        });
    }

    get json() {
        const o = this.object;
        o.employeeId = this.employee.id;
        o.supplierId = this.supplier.id;
        return o;
    }
}

PaymentCoupon.schema = {
    name: 'PaymentCoupon',
    primaryKey: 'id',

    properties: {
        id: 'int',
        supplier: 'Supplier',
        employee: 'Employee',
        content: 'string',
        money: 'int',
        create: 'date',
    },
};

PaymentCoupon.permission = {
    user: [],
    employee: ['read', 'create'],
};

export default PaymentCoupon;
