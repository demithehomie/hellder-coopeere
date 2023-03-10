import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController, NavController } from '@ionic/angular';
import { Login } from 'src/app/interfaces/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  selectedOption: string = '';

  
  showMenu: boolean = false;


  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  constructor(
    private router: Router,
    private formBuilder:  FormBuilder,
    private usersService: UsuarioService,
    public navCtrl: NavController,
    private alertController: AlertController
  ) { }

  login: Login = {
    usuario: "",
    senha: ""
  }

  ngOnInit(): void {
    this.validaForm();
  }
  
  formulariologin!: FormGroup;

  validaForm(){
    this.formulariologin = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      senha: ['', [Validators.required]]
    });
  }
  /*
  onSubmit() {
    const body = {
      username: this.login.usuario,
      password: this.login.senha
    };
    this.usersService.login(body)
    .subscribe({
    next: (res) => {
    console.log(res);
    console.log('Usuário autenticado.')


    
    this.navCtrl.navigateForward('/home');

    },
    error: (e) => {
      console.error(e)
      console.log("Dados Enviados", body);
    
    }
    });
  }
*/

onSubmit() {
  const body = {
    username: this.login.usuario,
    password: this.login.senha
  };

  this.usersService.login(body).subscribe({
    next: (res) => {
      console.log(res);
      console.log('Usuário autenticado.')
      this.presentSuccessAlert();
      this.navCtrl.navigateForward('/home');
    },
    error: (e) => {
      console.error(e)
      console.log("Dados Incorretos", body);
      this.presentErrorAlert();
    }
  });
}

async presentSuccessAlert() {
  const alert = await this.alertController.create({
    
    header: 'Meus parabéns! Agora você faz parte de um grupo de milhares de famílias que desejam se unir para produzir sua própria energia, diminuindo o custo, trazendo oportunidades de emprego técnico e novas tecnologias para a nossa região!     ',
    message: '   Hellder Benjamim, Presidente',
    buttons: ['OK']
  });

  await alert.present();
}

async presentErrorAlert() {
  const alert = await this.alertController.create({
    header: 'Falha na autenticação',
    message: 'Seu login não pôde ser autenticado.',
    buttons: ['OK']
  });

  await alert.present();
}

  goToPage(option: string) {
    switch (option) {
      case 'option1':
        this.router.navigateByUrl('/option1');
        break;
      case 'option2':
        this.router.navigateByUrl('/option2');
        break;
      case 'option3':
        this.router.navigateByUrl('/option3');
        break;
      default:
        break;
    }

  }

  openExternalLinkFacebook(){
    window.open('https://www.facebook.com', '_blank')
  }

  openExternalLinkInstagram(){
    window.open('https://www.instagram.com', '_blank')
  }

  openExternalLinkYouTube(){
    window.open('https://www.youtube.com', '_blank')
  }
/*
  async alertaDeSucesso() {
    const alert = await this.alertController.create({
      header: 'Bem-Vindo',
      subHeader: 'Seja bem-vindo a Plataforma da COOPEERE',
      message: 'Aproveite sua estadia!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async alertaDeFracasso() {
    const alert = await this.alertController.create({
      header: 'DADOS INVÁLIDOS',
      subHeader: 'Nome de usuário ou senha errados',
      message: 'Corrija seus dados para obter o acesso',
      buttons: ['OK'],
    });

    await alert.present();
  }

*/
 
}