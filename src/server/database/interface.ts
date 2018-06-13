export interface QueryCart extends Object {
    userId?: number;
    // DD-MM-YYYY
    begin?: string;
    end?: string;
    isBill?: boolean;
}

export interface QueryImportCoupon extends Object {
    employeeId?: number;
    supplierId?: number;
    begin?: string;
    end?: string;
}

export interface QueryOrderCoupon extends Object {
    employeeId?: number;
    supplierId?: number;
    begin?: string;
    end?: string;
}
