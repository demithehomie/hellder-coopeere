import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Subs } from 'src/app/interfaces/assinaturas';
import { TwoFAService } from 'src/app/services/2fa.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  emailVerification!: FormGroup
 
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private titleController: Title,
    private twofaService: TwoFAService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.titleController.setTitle('Esqueci minha senha')
   }


  async sendTheEmail(){
    const loading = await this.loadingController.create();
    await loading.present();
    this.twofaService.sendTheForgetEmail(this.emailVerification.value).subscribe(
      async (res) => {
        console.log(res)
        await loading.dismiss();
        this.router.navigateByUrl('/reset-password', { replaceUrl: true })
      },
      async (res: { error: any}) =>{
        console.log(res.error)
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Código Inválido',
          message: 'Revise o código inserido, por favor.',
          buttons: ['OK']
        });
      }
    )
  }
 
  ngOnInit() {
    this.emailVerification = this.formBuilder.group({
      email: ['', [Validators.required]],
      //transaction_id: ['', [Validators.required]],
  
    });
  }

  get email() {
    return this.emailVerification.get('email');
  }

}
