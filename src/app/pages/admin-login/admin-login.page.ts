import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.page.html',
  styleUrls: ['./admin-login.page.scss'],
})
export class AdminLoginPage implements OnInit {

  email!: string;
  password!: string;

  minutos!: number;
  segundos!: number;
  interval: any;

  verificationCode!: string;
  errorMessage!: string;
  successMessage!: string;
  data: any;
  id!: number;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private usuarioService: UsuarioService,
    private title: Title
    
    ) { 

      this.title.setTitle('ADMIN')
      this.minutos = 5;
      this.segundos = 0;
    }


  login() {
    if (this.email === 'helrov@hotmail.com' && this.password === 'tara9317') {
      // Autenticação bem-sucedida, redirecionar para a página principal
      this.router.navigate(['/admin-dashboard']);
    } else {
      // Exibir mensagem de erro de autenticação inválida
      console.log('Credenciais inválidas');
      this.errorMessage = 'Acesso Negado! Verifique suas credenciais.';
      this.successMessage = '';
    }
  }



  

  ngOnInit(): void {
    this.data = this.formBuilder.group({
      verificationCode: ["", 
        [Validators.required, 
          Validators.minLength(1), 
            Validators.maxLength(5),
              
          ]],
    });
  }



async forward(){
  this.router.navigateByUrl('/login')
}

body!: any

async resend(id: number){
this.usuarioService.startConfirmSMS(id)
console.log(id)
}



ionViewDidEnter() {

}

ionViewWillLeave() {

}



executeBoth(){

this.resend(this.id)
}

}
