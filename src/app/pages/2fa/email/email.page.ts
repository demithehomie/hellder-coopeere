import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Email } from 'src/app/interfaces/email';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.page.html',
  styleUrls: ['./email.page.scss'],
})
export class EmailPage implements OnInit {

  verificationCode!: string;
  errorMessage!: string;
  successMessage!: string;
  code: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private alertController: AlertController,
    private loadingController: LoadingController
    
  ) { 

    // this.code = new FormGroup({
    //   emailVerificationCode: new FormControl(),
    // });

  }


email: Email = {
  emailVerificationCode: ""
}



ngOnInit(): void{
  this.code = this.formBuilder.group({
    emailVerificationCode: ["", [Validators.required]],
    });

}



async confirmEmailCode(){

  try {
    await this.usuarioService.verifySMSCode(this.code.value);
    this.successMessage = 'Código do Email confirmado com sucesso!';
    this.errorMessage = '';
    this.alertController.create({
      header: 'Código Confirmado!',
      message: 'Agora insira o código enviado via SMS.',
      buttons: ['OK']
      
    })
    
  } catch (e: unknown) {
    this.alertController.create({
      header: 'Código Inválido',
      message: 'Revise o código inserido, por favor.',
      buttons: ['OK']
      
    })
    if (e instanceof Error) {
      this.errorMessage = e.message;
    } else {
      this.errorMessage = 'Ocorreu um erro desconhecido.';
    }
    this.successMessage = '';
  }


}

async forward(){
  this.router.navigateByUrl('/sms')
}
body!: any

async shootSMS(body: any){
  this.usuarioService.startSMSConfirmation(body)
}

}