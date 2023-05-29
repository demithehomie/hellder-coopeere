import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Cliente } from 'src/app/interfaces/cliente';
import { Login } from 'src/app/interfaces/login';
import { Usuario } from 'src/app/interfaces/usuario';
import { ViaCepService } from 'src/app/services/cep.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgxViacepService, Endereco, CEPError } from "@brunoc/ngx-viacep";
import { error } from 'console';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  title = "app";
  enderecoForm!: FormGroup;

  cpfControl: FormControl = new FormControl('');
  mobilePhoneControl: FormControl = new FormControl('');
  fixoControl: FormControl = new FormControl('');

buscaCep: FormGroup

  value!: any
  name!: any;
  cpfCnpj: any = '' 
  selectedOption: string = '';
  email: any;
  mobilePhone: any = '';
  phone: any;
  password: any;
  confirm_password: any;
  address: any;
  addressNumber: any;
  province: any;
  city: any;
  state: any;
  postalCode: any;
 
  constructor(
    private router: Router,
    private viacep: NgxViacepService,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private clienteService: ClienteService,
    public navCtrl: NavController, 
    private http: HttpClient,
    private titlePage: Title,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private viaCepService: ViaCepService

    ) {
      this.titlePage.setTitle('Continue Seu Cadastro')
      this.cpfControl.valueChanges.subscribe((value: string) => {
        this.formatarCPF();
      });
      this.mobilePhoneControl.valueChanges.subscribe((value: string) => {
        this.formatarTelefone();
      });
      this.fixoControl.valueChanges.subscribe((value: string) => {
        this.formatarTelefoneFixo();
      });

      this.buscaCep = this.formBuilder.group({
        postalCode: [''],
        logradouro: [''],
        bairro: [''],
        cidade: [''],
        estado: ['']
      });

      
    }
  
    searchCep() {
      // const cepControl = this.buscaCep.get('postalCode');
      // if (cepControl && cepControl.value) {
      //   const cep = cepControl.value;
      //   this.viaCepService.getAddressByCep(cep).subscribe(
      //     (response) => {
      //       this.buscaCep.patchValue({
      //         address: response.logradouro,
      //         province: response.bairro,
      //         city: response.localidade,
      //         state: response.uf
      //       });
      //     },
      //     (error) => {
      //       console.error('Erro ao buscar o CEP:', error);
      //     }
      //   );
      // } else {
      //   console.error('CEP inválido');
      //  console.log(cepControl)
      // }
    }
    
    
    // consultaCEP() {
    //   const cep = this.formulario.get('endereco.cep').value;
  
    //   if (cep != null && cep !== '') {
    //     this.cepService.consultaCEP(cep)
    //     .subscribe(dados => this.populaDadosForm(dados));
    //   }
    // }
  
    // populaDadosForm(dados) {
    //   // this.formulario.setValue({});
  
    //   this.formulario.patchValue({
    //     endereco: {
    //       rua: dados.logradouro,
    //       // cep: dados.cep,
    //       complemento: dados.complemento,
    //       bairro: dados.bairro,
    //       cidade: dados.localidade,
    //       estado: dados.uf
    //     }
    //   });
  
    //   //this.formulario.get('nome').setValue('Loiane');
  
    //   // console.log(form);
    // }


    formatarCPF() {
      let cpfRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
      if (this.cpfControl.value) {
        this.cpfControl.setValue(this.cpfControl.value.replace(cpfRegex, '$1.$2.$3-$4'));
      }
    }
    
    formatarTelefone() {
      let celularRegex = /^(\d{2})(\d{5})(\d{4})$/;
      if (this.mobilePhone !== null) {
        this.mobilePhoneControl.setValue(this.mobilePhoneControl.value.replace(celularRegex, '($1) $2-$3'));
      }
    }
    
    
    formatarTelefoneFixo() {
      let fixoRegex = /^(\d{2})(\d{4})(\d{4})$/;
      if (this.phone !== null) {
        this.fixoControl.setValue(this.fixoControl.value.replace(fixoRegex, '($1) $2-$3'));
      }
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

ngOnInit(): void{
  this.searchCep()
  // this.cpfControl = new FormControl('');
  // this.cpfControl.valueChanges.subscribe((value: string) => {
  //     this.formatarCPF();
  //   });
  this.validaForm();
  this.http.get('assets/buscarcep.js', { responseType: 'text'})
    .subscribe(js => {
      const script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = js;
    document.body.appendChild(script);
  });
}

cliente: Cliente = {
  name: " ",
  email: " ",
  company: "COOPEERE",
  //	password : " ",
  cpfCnpj: " ",
  mobilePhone: " ",
  phone: " ",
  postalCode: " ",
  address: " ",
  state: " ",
  province: " ",
  city: " ",
  addressNumber: " ",
  complement: " ",
  municipalInscription: " ",
  stateInscription: " ",
  additionalEmails: ['fale.conosco@coopeere.eco.br'],
  externalReference: " ",
  notificationDisabled: false,
  observations: 'Usuário faz parte da COOPEERE, consulte fale.conosco@coopeere.eco.br sobre dúvidas',
  id: ''
}

usuario: Usuario = {
  id: 0,
  email: "",
  password: "",
  confirm_password: "",
  role: 1,
  name: '',
  company: 'COOPEERE',
  cpfCnpj: null,
  mobilePhone: '',
  phone: '',
  postalCode: '',
  address: '',
  state: '',
  province: '',
  city: '',
  addressNumber: '',
  complement: '',
  municipalInscription: '',
  stateInscription: '',
  additionalEmails: [],
  externalReference: null,
  notificationDisabled: null,
  observations: 'Usuário faz parte da COOPEERE, consulte fale.conosco@coopeere.eco.br para retirar dúvidas'
}

formulario!: FormGroup;

validaForm(){
  this.formulario = this.formBuilder.group({
    name: ['', [Validators.required]],
    role: [1, [Validators.required]],
    cpfCnpj: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    company: ['COOPEERE', [Validators.required]],
    mobilePhone: ['', [Validators.required]],
    address: ['', [Validators.required]],
    addressNumber: ['', [Validators.required]],
    complement: ['', [Validators.required]],
    province: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    postalCode: ['', [Validators.required]],
    externalReference: ['', [Validators.required]],
    additionalEmails: ['fale.conosco@coopeere.eco.br', [Validators.required]],
    municipalInscription: ['', [Validators.required]],
    stateInscription: ['', [Validators.required]],
    observations: ['Usuário faz parte da COOPEERE, consulte fale.conosco@coopeere.eco.br para retirar dúvidas', [Validators.required]],
    groupname: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirm_password: ['', [Validators.required,  this.equalTo('senha')]],
  });

  this.name = this.formulario.get('name');
  this.email = this.formulario.get('email');
  this.cpfCnpj = this.formulario.get('cpfCnpj');
  this.mobilePhone = this.formulario.get('mobilePhone');
  this.phone = this.formulario.get('phone');
  this.password = this.formulario.get('password');
  this.confirm_password = this.formulario.get('confirm_password');
  this.postalCode = this.formulario.get('postalCode');
  this.address = this.formulario.get('address');
  this.addressNumber = this.formulario.get('addressNumber');
  this.province = this.formulario.get('province');
  this.city = this.formulario.get('city');
  this.state = this.formulario.get('state');

}

equalTo(field_name: string) {
  return (control: any) => {
    const field = control.parent?.get(field_name);
    if (field && control.value !== field.value) {
      return { equalTo: true };
    }
    return null;
  };
}

async cadastro(){
   const loading = await this.loadingController.create();
  await loading.present();

  const {
    role,
    name,
    email,
    phone,
    company,
    additionalEmails,
    mobilePhone, 
    cpfCnpj,
    postalCode,
    address,
    addressNumber,
    complement,
    province,
    city,
    state,
    password,
    observations
    
  }= this.formulario.value
  this.usuarioService.create(
    role,
    name,
    email,
    phone,
    company,
    additionalEmails,
    mobilePhone, 
    cpfCnpj,
    postalCode,
    address,
    addressNumber,
    complement,
    province,
    city,
    state,
    password,
    observations
  ).subscribe(
    async (res: any) => {
     // this.router.navigateByUrl('/home', { replaceUrl: true });
      this.cadastroCliente()
      this.navCtrl.navigateForward('/email');
      console.log(res)
      
      console.log('Usuário cadastrado com Sucesso')
      await loading.dismiss();
       const alert = await this.alertController.create({
        header: 'Tudo certo!',
        message: 'Usuário cadastrado com sucesso.',
        buttons: ['OK']
      });

      await alert.present();
      
    },  
    async (res: { error: any; }) => {
      await loading.dismiss();
      console.log(res.error)
      
     // this.presentErrorAlert()
      const alert = await this.alertController.create({
        header: 'Falha na autenticação',
        message: 'Seu cadastro não pôde ser autorizado.',
        buttons: ['OK']
      });

      await alert.present();
    }
  );
  
}

async cadastroCliente(){
  const loading = await this.loadingController.create();
  await loading.present();

const  {
    name,
    email ,
    phone,
    mobilePhone, 
    cpfCnpj,    
    company,     
    additionalEmails,
    postalCode,
    address,    
    addressNumber,
    complement,
    province, 
    city,     
    observations
  } = this.formulario.value
  this.clienteService.create(
    name,
    email ,
    phone,
    mobilePhone, 
    cpfCnpj,    
    company,     
    additionalEmails,
    postalCode,
    address,    
    addressNumber,
    complement,
    province, 
    city,     
    observations
  ).subscribe( async (res: any) => {
     // this.router.navigateByUrl('/home', { replaceUrl: true });
    
    
      
      console.log(res)
     
      console.log('Cliente cadastrado com Sucesso')
      await loading.dismiss();
       const alert = await this.alertController.create({
        header: 'Seja bem-vindo!',
        message: 'Conta Asaas configurada com sucesso.',
        buttons: ['OK']
      });

      await alert.present();
      
    },  
    async (res: { error: any; }) => {
      await loading.dismiss();
      console.log(res.error)
      
     // this.presentErrorAlert()
      const alert = await this.alertController.create({
        header: 'Não foi possível configurar sua conta Asaas',
        message: 'Verifique seus dados.',
        buttons: ['OK']
      });

      await alert.present();
    }
  );
}

// 
// @HostListener('input', ['$event'])
// onInput(event: Event) {
//   const input = event.target as HTMLInputElement;
//   if (input.value === '0') {
//     this.cliente.cpfCnpj = null;
//   }
// }


}