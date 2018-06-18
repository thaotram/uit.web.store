/**
 * @typedef {'Book'|'User'|'Employee'|'Supplier'|'Cart'|'ExportBill'|'ImportCoupon'|'OrderCoupon'|'PaymentCoupon'} Model
 */

/**
 * @param {Number} id
 */
export function employee(id) {
    const employee = this.data.Employees.find(employee => employee.id === id);
    return user((employee || {}).userId, this);
}

/**
 * @param {Number} id
 * @param {import('vue').default} self
 */
export function user(id, self) {
    const user = (this || self).data.Users.find(user => user.id === id);
    if (user) return user;
    return {
        id: -1,
        name: 'Khách vãng lai',
    };
}

/**
 * @param {Number} id
 */
export function supplier(id) {
    const supplier = this.data.Suppliers.find(supplier => supplier.id === id);
    return supplier;
}
