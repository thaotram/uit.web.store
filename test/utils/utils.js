import path from 'path';
import chalk from 'chalk';
/**
 *
 * @param {String} name
 */
const root = process.cwd();
export function filename(name) {
    return chalk.bold.magenta(`[ ${path.relative(root, name)} ]`);
}

/**
 *
 * @param {String} method
 * @param {String} description
 */
export function itname(method, description) {
    return `${chalk.bold.blue(method)} ${chalk.gray(description)}`;
}
