import { Component, OnInit } from '@angular/core';
import { Subs } from 'src/app/interfaces/assinaturas';

@Component({
  selector: 'app-pagamentoprodist',
  templateUrl: './pagamentoprodist.page.html',
  styleUrls: ['./pagamentoprodist.page.scss'],
})
export class PagamentoprodistPage implements OnInit {

  constructor() { }

  subs: Subs = {
    customer: '',
    billingType: '',  //subs.billingType
    nextDueDate: '',
    value: 0,
    cycle: '',
    description: '',
    discount: {
      value: 0.00,
        dueDateLimitDays: 0
    },
    fine: {
      value: 1.00,
    },
    interest: {
      value: 2.00
    }
  }

  
  ngOnInit() {
  }

}
