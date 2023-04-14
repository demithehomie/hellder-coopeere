export interface Subs {
    customer: string
    billingType: string
    nextDueDate: string
    value: number
    cycle: string
    description: string
    discount: Discount
    fine: Fine
    interest: Interest
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
  