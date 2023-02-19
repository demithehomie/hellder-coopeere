export class CreatePaymentDto {

    customer: string;
    billingType: string;
    dueDate: string;
    value: number;
    description: string;
    externalReference: string;
    discount: number;
    fine: number;
    interest: number;
    postalService: boolean;
}

/*

declare module namespace {

    export interface Discount {
        value: number;
        dueDateLimitDays: number;
    }

    export interface Fine {
        value: number;
    }

    export interface Interest {
        value: number;
    }

    export interface RootObject {
        customer: string;
        billingType: string;
        dueDate: string;
        value: number;
        description: string;
        externalReference: string;
        discount: Discount;
        fine: Fine;
        interest: Interest;
        postalService: boolean;
    }

}



*/