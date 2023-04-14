export interface Cobranca {
    customer: string
    billingType: string
    dueDate: string
    value: number
    description: string
    externalReference: string
    discount: Discount
    fine: Fine
    interest: Interest
    postalService: boolean
  }
  
  export interface Discount {
    value: number
    dueDateLimitDays: number
  }
  
  export interface Fine {
    value: number
  }
  
  export interface Interest {
    value: number
  }
  