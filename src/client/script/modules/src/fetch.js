/**
 *
 * @param {Number} id
 */
export function employee(id) {
    const employee = this.data.employees.find(employee => employee.id === id);
    return user((employee || {}).userId, this);
}

/**
 *
 * @param {Number} id
 * @param {import('vue').default} self
 */
export function user(id, self) {
    const user = (this || self).data.users.find(user => user.id === id);
    if (user) return user;
    return {
        id: -1,
        name: 'Khách vãng lai',
    };
}

/**
 *
 * @param {Number} id
 */
export function supplier(id) {
    const supplier = this.data.suppliers.find(supplier => supplier.id === id);
    return supplier;
}
