import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Login } from 'src/app/interfaces/login';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Title } from '@angular/platform-browser';
import { AppStorageService } from 'src/app/services/app-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

@Injectable({
  providedIn: 'root'
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
    private titleController: Title,
    private appStorageService: AppStorageService
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

  //// STORAGE - BELOW

  setToken(token: any){
    this.appStorageService.set(`token`,`${token}`)
  }

  setId(id: any){
    this.appStorageService.set(`id`, `${id}`)
  }
  
  setUsername(name: any){
    this.appStorageService.set(`name`,`${name}`)
  }
  
  setEmail(email: any){
    this.appStorageService.set(`email`,`${email}`)
  }
  
  setCPF(cpfCnpj: any){
    this.appStorageService.set(`cpfCnpj`,`${cpfCnpj}`)
  }
  
  setMobilePhone(mobilePhone: any){
    this.appStorageService.set(`mobilePhone`,`${mobilePhone}`)
  }
  
  setPhone(phone: any){
    this.appStorageService.set(`phone`,`${phone}`)
  }
  
  setCompany(company: any){
    this.appStorageService.set(`company`,`${company}`)
  }
  
  setPostalCode(postalCode: any){
    this.appStorageService.set(`postalCode`,`${postalCode}`)
  }
  
  setAddress(address: any){
    this.appStorageService.set(`address`,`${address}`)
  }
  
  setState(state: any){
    this.appStorageService.set(`state`,`${state}`)
  }

  setProvince(province: any){
    this.appStorageService.set(`province`,`${province}`)
  }
  
  setCity(city: any){
    this.appStorageService.set(`city`,`${city}`)
  }
  
  setAddressNumber(addressNumber: any){
    this.appStorageService.set(`addressNumber`,`${addressNumber}`)
  }
  
  

///// STORAGE - ABOVE (FUNCTIONS IMPLEMENTED BELOW)

async onSubmit() {
  const accessToken = ""
  const loading = await this.loadingController.create();
  await loading.present();

  this.authenticationService.login(this.credentials.value).subscribe(
    async (res: any) => {
      this.router.navigateByUrl('/home', { replaceUrl: true });
      //this.setToken(res.token.accessToken)
      this.setId(res.id)
      this.setUsername(res.name)
      this.setEmail(res.email)
      this.setCPF(res.cpfCnpj)
      this.setMobilePhone(res.mobilePhone)
      this.setPhone(res.phone)
      this.setCompany(res.company)
      this.setPostalCode(res.postalCode)
      this.setProvince(res.province)
      this.setAddress(res.address)
      this.setAddressNumber(res.addressNumber)
      this.setState(res.state)
      this.setCity(res.city)
      
      console.log(res)
      await loading.dismiss();
      this.presentSuccessAlert() 
      
    },  
    async (res: { error: any; }) => {
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