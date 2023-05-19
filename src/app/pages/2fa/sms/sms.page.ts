import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
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

  minutos!: number;
  segundos!: number;
  interval: any;

  verificationCode!: string;
  errorMessage!: string;
  successMessage!: string;
  data: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private usuarioService: UsuarioService,
    private title: Title
    
    ) { 

      this.title.setTitle('Confirme seu Celular')
      this.minutos = 5;
      this.segundos = 0;
    }

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

  body!: any

 async resend(body: any){
  this.usuarioService.startSMSConfirmation()
 }
  
 

 ionViewDidEnter() {
  this.startCronometro();
}

ionViewWillLeave() {
  clearInterval(this.interval);
}

startCronometro() {
  this.interval = setInterval(() => {
    if (this.segundos > 0) {
      this.segundos--;
    } else {
      if (this.minutos === 0) {
        clearInterval(this.interval);
      } else {
        this.minutos--;
        this.segundos = 59;
      }
    }
  }, 1000);
}

formatTime(time: number) {
  return time < 10 ? `0${time}` : time;
}

reiniciarCronometro() {
  clearInterval(this.interval);
  this.minutos = 5;
  this.segundos = 0;
  this.startCronometro();
}

}
