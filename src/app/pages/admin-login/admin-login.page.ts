import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Login } from 'src/app/interfaces/login';
import { AppStorageService } from 'src/app/services/app-storage.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.page.html',
  styleUrls: ['./admin-login.page.scss'],
})
export class AdminLoginPage implements OnInit {

  credentials!: FormGroup;
  showMenu: boolean = false;

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  

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
    private usersService: UsuarioService,
    public navCtrl: NavController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private authenticationService: AuthenticationService,
    private titleController: Title,
    private appStorageService: AppStorageService
    
    ) { 

      this.titleController.setTitle('ADMIN')
      this.minutos = 5;
      this.segundos = 0;
    }


    login: Login = {
      email: "",
      password: ""
    };
  
    ngOnInit(): void {
      this.validaForm();
    }
  
    validaForm() {
      this.credentials = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
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
      const loading = await this.loadingController.create();
      await loading.present();
  
      this.authenticationService.loginSimplificado(this.credentials.value).subscribe(
        async (res: any) => {
          if (res.role === 2) {
            this.router.navigateByUrl('/admin-dashboard', { replaceUrl: true });
            this.setToken(res.token.accessToken);
            this.setId(res.id);
            this.setUsername(res.name);
            this.setEmail(res.email);
            this.setCPF(res.cpfCnpj);
            this.setMobilePhone(res.mobilePhone);
            this.setPhone(res.phone);
            this.setCompany(res.company);
            this.setPostalCode(res.postalCode);
            this.setProvince(res.province);
            this.setAddress(res.address);
            this.setAddressNumber(res.addressNumber);
            this.setState(res.state);
            this.setCity(res.city);
  
            console.log(res);
            await loading.dismiss();
            this.presentSuccessAlert();
          } else {
            await loading.dismiss();
            this.presentErrorAlert('Acesso não autorizado.');
          }
        },
        async () => {
          await loading.dismiss();
          this.presentErrorAlert('Seu login não pôde ser autenticado.');
        }
      );
    }
  
    async presentSuccessAlert() {
     // const res = this.onSubmit.r
      const alert = await this.alertController.create({
        // header: `Bem-Vindo, ${res.name}`,
        header: `Bem-Vindo a Área de Membros`,
        message: `Suas credenciais foram validadas`,
        buttons: ['OK']
      });
  
      await alert.present();
    }
  
    async presentErrorAlert(message: string) {
      const alert = await this.alertController.create({
        header: 'Falha na autenticação',
        message: message,
        buttons: ['OK']
      });
    
      await alert.present();
    }
    

    get email() {
      return this.credentials.get('email');
    }
    
    get password() {
      return this.credentials.get('password');
    }
}
