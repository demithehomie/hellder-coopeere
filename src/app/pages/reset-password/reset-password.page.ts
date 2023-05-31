import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Subs } from 'src/app/interfaces/assinaturas';
import { resetPassword } from 'src/app/interfaces/resetPassword';
import { TwoFAService } from 'src/app/services/2fa.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  emailFinalReset!: FormGroup
 
  forgetVerificationCode!: any;
  password!: any;
  mostrarSenha: boolean = false;
 
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

   toggleMostrarSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  // emailFinalReset: resetPassword = {
  //   forgetVerificationCode: "",
  //   password: ""
  // }




  /* async */ ngOnInit(): void {
    // const loading = await this.loadingController.create();
    // await loading.present();

  this.emailFinalReset = this.formBuilder.group({
    forgetVerificationCode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  this.emailFinalReset.controls['forgetVerificationCode'].valueChanges
    .pipe(debounceTime(3000))
    .subscribe(() => {
    //  loading.dismiss();
      if (this.emailFinalReset.controls['forgetVerificationCode'].invalid) {
        this.showForgetVerificationCodeErrorAlert();
      }
    });

  this.emailFinalReset.controls['password'].valueChanges
    .pipe(debounceTime(3000))
    .subscribe(() => {
 //     loading.dismiss();
      if (this.emailFinalReset.controls['password'].invalid) {
        this.showPasswordErrorAlert();
      }
    });
}

async showForgetVerificationCodeErrorAlert() {
  const alert = await this.alertController.create({
    header: ' ERRO',
    message: 'O código inserido é muito curto, deve ter 5 caracteres.',
    buttons: ['OK']
  });
  await alert.present();
}

async showPasswordErrorAlert() {
  const alert = await this.alertController.create({
    header: 'ERRO',
    message: 'A senha precisa ter no mínimo 6 caracteres',
    buttons: ['OK']
  });
  await alert.present();
}

  // equalTo(field_name: string) {
  //   return (control: any) => {
  //     const field = control.parent?.get(field_name);
  //     if (field && control.value !== field.value) {
  //       return { equalTo: true };
  //     }
  //     return null;
  //   };
  // }  ;;

  async verifyTheEmail() {

  
    const loading = await this.loadingController.create();
    await loading.present();
  
    this.twofaService.sendTheNewPassword(this.emailFinalReset.value).subscribe(
      async (res) => {
        console.log(res);
        await loading.dismiss();
        this.router.navigateByUrl('/login', { replaceUrl: true });
        const alert = await this.alertController.create({
          header: 'Senha alterada com sucesso',
          message: 'Você está pronto para fazer login',
          buttons: ['OK']
        });
        await alert.present();
      },
      async (res: { error: any }) => {
        console.log(res.error);
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'ERRO',
          message: 'Verifique os dados inseridos.',
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }
  
 

  // get forgetVerificationCode() {
  //   return this.emailVerification.get('emailVerificationCode');
  // }


  
  // get password() {
  //   return this.emailVerification.get('password');
  // }
}

