import { Model, Employee, User, Supplier, Book } from '../../database/database';

type operator = '=' | '>' | '<' | '>=' | '<=';

type Operators = {
    [K in operator]: {
        [key: string]: string | number;
    }
};

export interface Read extends Operators {
    max?: number;
    page?: number;

    _: string;
    model: Model;

    return?: string;

    authorize: User;
}

export interface Create extends Object {
    _: string;
    model: Model;

    return?: string;

    authorize: User;

    details?: {};

    name?: string;
    phone?: string;
    address?: string;
    birthdate?: string;

    userId?: number;
    bookId?: number;
    supplierId?: number;
    employeeId?: number;

    user?: User;
    book?: Book;
    supplier?: Supplier;
    employee?: Employee;
}

export interface Update extends Object {
    _: string;
    model: Model;

    return?: string;

    authorize: User;

    details?: {};

    name?: string;
    phone?: string;
    address?: string;
    birthdate?: string;

    userId?: number;
    bookId?: number;
    supplierId?: number;
    employeeId?: number;

    user?: User;
    book?: Book;
    supplier?: Supplier;
    employee?: Employee;
}
