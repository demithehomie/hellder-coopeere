import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Subs } from 'src/app/interfaces/assinaturas';
import { TwoFAService } from 'src/app/services/2fa.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

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

   ngOnInit() {
    this.emailVerification = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required,  this.equalTo('password')]],
      emailVerificationCode: ['', [Validators.required]],
  
    });
  }

  equalTo(field_name: string) {
    return (control: any) => {
      const field = control.parent?.get(field_name);
      if (field && control.value !== field.value) {
        return { equalTo: true };
      }
      return null;
    };
  }

  async sendTheEmail(){
    const loading = await this.loadingController.create();
    await loading.present();
    this.twofaService.sendTheNewPasswordEmail(this.emailVerification.value).subscribe(
      async (res) => {
        await loading.dismiss();
        this.router.navigateByUrl('/login', { replaceUrl: true })
      },
      async (res) =>{
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Código Inválido',
          message: 'Revise o código inserido, por favor.',
          buttons: ['OK']
        });
      }
    )
  }
 
 

  get emailVerificationCode() {
    return this.emailVerification.get('emailVerificationCode');
  }


  
  get password() {
    return this.emailVerification.get('password');
  }
}

