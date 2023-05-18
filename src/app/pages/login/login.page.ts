import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Login } from 'src/app/interfaces/login';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials!: FormGroup;

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
    private alertController: AlertController,
    private loadingController: LoadingController,
    private authenticationService: AuthenticationService,
    private titleController: Title
  ) { 
    this.titleController.setTitle('Login - Coopeere')
  }

  login: Login = {
   email: "",
   password: ""
  }

  //user: "";

  googleAuth(){
    return this.usersService.googleAuth().subscribe({next: (res) => 
      {
        console.log(res);
        console.log("Usuário cadastrado com sucesso")
      },
  })
  }

  ngOnInit(): void {
    this.validaForm();
  }
  


  validaForm(){
    this.credentials = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


async onSubmit() {

  const loading = await this.loadingController.create();
  await loading.present();



  this.authenticationService.login(this.credentials.value).subscribe(
    async (res) => {
     // console.log(this.credentials.value)
      await loading.dismiss();
      this.presentSuccessAlert() 
      this.router.navigateByUrl('/home', { replaceUrl: true });
    },
    async (res) => {
      await loading.dismiss();
     // this.presentErrorAlert()
      const alert = await this.alertController.create({
        header: 'Falha na autenticação',
        message: 'Seu login não pôde ser autenticado.',
        buttons: ['OK']
      });

      //await alert.present();
    }
  );
}

async presentSuccessAlert() {
  const alert = await this.alertController.create({
    
    header: 'Meus parabéns! Agora você faz parte de um grupo de milhares de famílias que desejam se unir para produzir sua própria energia, diminuindo o custo, trazendo oportunidades de emprego técnico e novas tecnologias para a nossa região!     ',
    message: 'Hellder Benjamim, Presidente',
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

  get email() {
    return this.credentials.get('email');
  }
  
  get password() {
    return this.credentials.get('password');
  }
 
}