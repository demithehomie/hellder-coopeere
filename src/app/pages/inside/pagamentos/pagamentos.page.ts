import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Subs } from 'src/app/interfaces/assinaturas';

@Component({
  selector: 'app-Pagamentos',
  templateUrl: './Pagamentos.page.html',
  styleUrls: ['./Pagamentos.page.scss'],
})
export class PagamentosPage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private titleController: Title
  ) {
    this.titleController.setTitle('Assinatura - Coopeere')
   }

  valorTotal: number = 0;

  payments!: FormGroup

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

  makeThePayment(){

  }
  
  ngOnInit() {
    this.payments = this.formBuilder.group({
      object: ['', [Validators.required]],
      //transaction_id: ['', [Validators.required]],
      customer_id: ['', [Validators.required]],
      value: ['', [Validators.required]],
      billingType: ['', [Validators.required]],
      nextDueDate: ['', [Validators.required]],
      cycle: ['', [Validators.required]],
      description: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      fine: ['', [Validators.required]],
      interest: ['', [Validators.required]],
    });
  }

}
