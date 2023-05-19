import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
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
  minutos!: number;
  segundos!: number;
  interval: any;


  verificationCode!: string;
  errorMessage!: string;
  successMessage!: string;
  code!: FormGroup;
  data: any;
  id: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private title: Title
  
  
  ) { 
    this.title.setTitle('Confirme seu email')
    this.minutos = 5;
    this.segundos = 0;
  }


email: Email = {
  emailVerificationCode: ""
}


ngOnInit(): void {
  this.code = this.formBuilder.group({
    emailVerificationCode: ["", 
      [Validators.required, 
        Validators.minLength(1), 
          Validators.maxLength(5),
            
        ]],
  });
}

async confirmEmailCode() {
  this.usuarioService.confirmEmail(this.email.emailVerificationCode)
    .subscribe({
      next: (res) => {
        console.log(res);
        console.log("Código confirmado com sucesso");
        this.successMessage = 'Código Email confirmado com sucesso!';
      this.errorMessage = '';
      },
      error: (e) => {
        console.error(e);
        this.errorMessage = 'Ocorreu um erro desconhecido.';
        this.successMessage = '';
        },    
      });
}


async forward(){
  this.router.navigateByUrl('/sms')
}
body!: any

async shootSMS(body: any){
  this.usuarioService.startSMSConfirmation()
}

async resend(id: any){
  this.usuarioService.startConfirmByEmail(id)
  console.log(id)
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

  executeBoth(){
    this.reiniciarCronometro();
    this.resend(this.id)
  }

}