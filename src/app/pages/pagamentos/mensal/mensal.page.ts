import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Subs } from 'src/app/interfaces/assinaturas';
import { ClienteService } from 'src/app/services/cliente.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-Mensal',
  templateUrl: './Mensal.page.html',
  styleUrls: ['./Mensal.page.scss'],
})
export class MensalPage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private titleController: Title,
    private paymentService: PaymentService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private clientService: ClienteService
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


  
  ngOnInit() {
    this.payments = this.formBuilder.group({
      object: ['subscriptions', [Validators.required]],
      //transaction_id: ['', [Validators.required]],
      customer_id: ['', [Validators.required]],
      value: ['3.50', [Validators.required]],
      billingType: ['', [Validators.required]],
      nextDueDate: ['', [Validators.required]],
      cycle: ['MONTHLY', [Validators.required]],
      description: ['Plano Mensal - Coopeeere', [Validators.required]],
      discount: ['0', [Validators.required]],
      fine: ['0', [Validators.required]],
      interest: ['0', [Validators.required]],
    });
  }

  


  async makeThePayment() {

    const loading = await this.loadingController.create();
    await loading.present();
  
   
  
    this.paymentService.makeThePayment(this.payments.value).subscribe(
      async (res) => {
        console.log(this.payments.value)
        await loading.dismiss();
        this.presentSuccessAlert() 
        this.router.navigateByUrl('/home', { replaceUrl: true });
      },
      async (res) => {
        await loading.dismiss();
        this.presentErrorAlert()
        
      }
    );
  }

  async presentSuccessAlert() {
    const alert = await this.alertController.create({
      
      header: 'Assinatura Efetudada com Sucesso',
      message: 'Comprovante enviado por email',
      buttons: ['OK']
    });
  
    //await alert.present();
  }
  
  async presentErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Falha no pagamento',
      message: 'Verifique os dados inseridos',
      buttons: ['OK']
    });
  
    //await alert.present();
  }
  

}
