import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { SMS } from 'src/app/interfaces/sms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.page.html',
  styleUrls: ['./sms.page.scss'],
})
export class SmsPage implements OnInit {

  verificationCode!: string;
  errorMessage!: string;
  successMessage!: string;
  data: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private usuarioService: UsuarioService
    
    ) { }

    sms: SMS = {
      verificationCode: ""
    }

  ngOnInit() {
    this.data = this.formBuilder.group({
  
          verificationCode: ['', [Validators.required]],
        });
  }

  async confirmSMSCode() {
    try {
      await this.usuarioService.verifySMSCode(this.data.value);
      this.successMessage = 'Código SMS confirmado com sucesso!';
      this.errorMessage = '';
    } catch (e: unknown) {
      if (e instanceof Error) {
        this.errorMessage = e.message;
      } else {
        this.errorMessage = 'Ocorreu um erro desconhecido.';
      }
      this.successMessage = '';
    }
  }
  
  async forward(){
    this.router.navigateByUrl('/login')
  }

 

  // data!: FormGroup;

  // validaForm(){
  //   this.data = this.formBuilder.group({
  
  //     verificationCode: ['', [Validators.required]],
  //   });
  // }
  
  // equalTo(field_name: string) {
  //   return (control: any) => {
  //     const field = control.parent?.get(field_name);
  //     if (field && control.value !== field.value) {
  //       return { equalTo: true };
  //     }
  //     return null;
  //   };
  // }
  
  // async confirmar(){
  
  //   const loading = await this.loadingController.create();
  //   await loading.present();
    
  
  //   this.usuarioService.confirmSMS(this.data.value).subscribe(
  //     async (res) => {
  //      // console.log(this.credentials.value)
  //       await loading.dismiss();
  //       this.presentSuccessAlert() 
  //       this.router.navigateByUrl('/login', { replaceUrl: true });
  //     },
  //     async (res) => {
  //       await loading.dismiss();
  //      // this.presentErrorAlert()
  //       const alert = await this.alertController.create({
  //         header: 'Celular não verificado',
  //         message: 'Verifique seu código.',
  //         buttons: ['OK']
  //       });
  
  //       //await alert.present();
  //     }
  //   );
  // }
  
  // async presentSuccessAlert() {
  //   const alert = await this.alertController.create({
      
  //     header: 'Código confirmado! Tudo certo! ',
  //     message: 'Aguarde para ser redirecionado para o login',
  //     buttons: ['OK']
  //   });
  
  //  // await alert.present();
  // }
  

}
