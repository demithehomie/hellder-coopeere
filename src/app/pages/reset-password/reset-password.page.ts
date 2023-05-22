import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Subs } from 'src/app/interfaces/assinaturas';
import { resetPassword } from 'src/app/interfaces/resetPassword';
import { TwoFAService } from 'src/app/services/2fa.service';

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

   ngOnInit(): void {
    this.emailFinalReset = this.formBuilder.group({
      forgetVerificationCode: ['', [Validators.required]],
      password: ['', [Validators.required, , Validators.minLength(6)]],
     // confirm_password: ['', [Validators.required,  this.equalTo('password')]],
    
    });
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

  async verifyTheEmail(){
    // const emailVerification = {
    //   forgetVerificationCode: this.emailFinalVerification.forgetVerificationCode,
    //   password: this.emailFinalVerification.password
    // }
    const loading = await this.loadingController.create();
    await loading.present();
    this.twofaService.sendTheNewPassword(this.emailFinalReset.value).subscribe(
      async (res) => {
        console.log(res)
        await loading.dismiss();
        this.router.navigateByUrl('/login', { replaceUrl: true })
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
 
 

  // get forgetVerificationCode() {
  //   return this.emailVerification.get('emailVerificationCode');
  // }


  
  // get password() {
  //   return this.emailVerification.get('password');
  // }
}

