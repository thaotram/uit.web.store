export interface QueryCart extends Object {
    userId?: number;
    // DD-MM-YYYY
    begin?: string;
    end?: string;
    isBill?: boolean;
}