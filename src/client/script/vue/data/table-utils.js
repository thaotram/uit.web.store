/**
 * @param {Vue} table
 */
export function getTableStyle(table) {
    return table.colSize.reduce(
        (previous, current, index) => ({
            ...previous,
            [selector(table._uid, index)]: { flex: current[0], textAlign: current[1] },
        }),
        {},
    );
}

function selector(uid, index) {
    return `.table-view[uid="${uid}"] .table-row > *:nth-child(${index + 1})`;
}
