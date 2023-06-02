



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
endereco: any;
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

    cep: any;
    logradouro: any;
    localidade: any;
    bairro: any;
    uf: any;
    ddd: any;
  
    searchCep() {
      this.viaCepService.getCEP(this.cep).subscribe((data) => {
        this.postalCode = data.cep;
        this.address = data.logradouro;
        this.city = data.localidade;
        this.province = data.bairro;
        this.state = data.uf;
       // this.ddd = data.ddd;

        console.log(data);
    });
    }

    blur(event: any) {
      this.searchCep();

      console.log(this.searchCep);
  }

  showEmptyBorders: boolean = false;
    
 
  
    
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
  // this.searchCep()
  // this.cpfControl = new FormControl('');
  // this.cpfControl.valueChanges.subscribe((value: string) => {
  //     this.formatarCPF();
  //   });
  this.validaForm();
  this.http.get('assets/buscarcep2.js', { responseType: 'text'})
    .subscribe(js => {
      const script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = js;
    document.body.appendChild(script);
  });
}

cliente: Cliente = {
  name: "",
  email: "",
  company: "COOPEERE",
  //	password : "",
  cpfCnpj: "",
  mobilePhone: "",
  phone: "",
  postalCode: "",
  address: "",
  state: "",
  province: "",
  city: "",
  addressNumber: "",
  complement: "Usuario da Coopeere",
  municipalInscription: "",
  stateInscription: "",
  additionalEmails: 'fale.conosco@coopeere.eco.br',
  externalReference: "",
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
  complement: 'Usuário da COOPEERE',
  municipalInscription: '',
  stateInscription: '',
  additionalEmails: 'fale.conosco@coopeere.eco.br',
  externalReference: null,
  notificationDisabled: null,
  observations: 'Usuário faz parte da COOPEERE, consulte fale.conosco@coopeere.eco.br para retirar dúvidas'
}

formulario!: FormGroup;

validaForm(){
  this.formulario = this.formBuilder.group({
    name: ['', [Validators.required]],
    role: [1, [Validators.required]],
    email: ['', [Validators.required]],
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
    additionalEmails: [[''], [Validators.required]],
    municipalInscription: ['', [Validators.required]],
    stateInscription: ['', [Validators.required]],
    observations: ['Usuário faz parte da COOPEERE, consulte fale.conosco@coopeere.eco.br para retirar dúvidas', [Validators.required]],
    groupname: ['', [Validators.required]],
   
    password: ['', [Validators.required]],
    confirm_password: ['', [Validators.required,  this.equalTo('password')]],
  });

  // this.name = this.formulario.get('name');
  // this.email = this.formulario.get('email');
  // this.cpfCnpj = this.formulario.get('cpfCnpj');
  // this.mobilePhone = this.formulario.get('mobilePhone');
  // this.phone = this.formulario.get('phone');
  // this.password = this.formulario.get('password');
  // this.confirm_password = this.formulario.get('confirm_password');
  // this.postalCode = this.formulario.get('postalCode');
  // this.address = this.formulario.get('address');
  // this.addressNumber = this.formulario.get('addressNumber');
  // this.province = this.formulario.get('province');
  // this.city = this.formulario.get('city');
  // this.state = this.formulario.get('state');

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

checkEmpty(input: EventTarget | null) {
  if (input instanceof HTMLInputElement) {
    if (input.value.trim() === "") {
      input.classList.add("empty");
    } else {
      input.classList.remove("empty");
    }
  }
}



nameClicked = false;
emailClicked = false;
passwordClicked = false;
confirmPasswordClicked = false;
cpfClicked = false;
mobilePhoneClicked = false;
phoneClicked = false;
postalCodeClicked = false;
addressClicked = false;
stateClicked = false;
provinceClicked = false;
cityClicked = false;
addressNumberClicked = false;

checkFields() {
  if (this.usuario?.name?.trim() === '') {
    this.nameInputClicked = true;
  }
  
  if (this.email.trim() === '') {
    // Email está vazio
  }
  
  // Verificar outros campos
}

checkFieldss(input: EventTarget | null) {
  if (input instanceof HTMLInputElement) {
    if (input.value.trim() === "") {
      input.classList.add("empty");
    } else {
      input.classList.remove("empty");
    }
  }
}


nameInputClicked = false;
emailInputClicked = false;
passwordInputClicked = false;
confirmPasswordInputClicked = false;
cpfInputClicked = false;
mobilePhoneInputClicked = false;
phoneInputClicked = false;
postalCodeInputClicked = false;
addressInputClicked = false;
stateInputClicked = false;
provinceInputClicked = false;
cityInputClicked = false;
addressNumberInputClicked = false;

//

async cadastro() {

  
    const loading = await this.loadingController.create();
    await loading.present();

    const data = {
      role: this.usuario.role,
      name: this.usuario.name,
      email: this.usuario.email,
      phone: this.usuario.phone,
      company: this.usuario.company,
      additionalEmails: this.usuario.additionalEmails,
      mobilePhone: this.usuario.mobilePhone,
      cpfCnpj: this.usuario.cpfCnpj,
      postalCode: this.usuario.postalCode,
      addressNumber: this.usuario.addressNumber,
      complement: this.usuario.complement,
      province: this.usuario.province,
      address: this.usuario.address,
      city: this.usuario.city,
      state: this.usuario.state,
      password: this.usuario.password,
      observations: this.usuario.observations,
    };

    this.usuarioService.create(data).subscribe(
      async (res: any) => {
        this.cadastroCliente();
        this.navCtrl.navigateForward('/email');
        console.log(res);
        console.log('Usuário cadastrado com Sucesso');
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Tudo certo!',
          message: 'Usuário cadastrado com sucesso.',
          buttons: ['OK'],
        });
        await alert.present();
        
      },
      async (res: { error: any }) => {
        await loading.dismiss();
        console.log(res.error);
        console.log(data);
        const alert = await this.alertController.create({
          header: 'Falha na autenticação',
          message: 'Seu cadastro não pôde ser autorizado.',
          buttons: ['OK'],
        });
        await alert.present(); 

        let camposVazios: string[] = [];

        // Itera sobre todos os campos do formulário
  Object.keys(this.formulario.controls).forEach((campo) => {
    const valorCampo = this.formulario.get(campo)?.value;
    if (!valorCampo || valorCampo.trim() === "") {
      camposVazios.push(campo);
    }
  });

  // Verifica se existem campos vazios
  if (camposVazios.length > 0) {
    this.exibirAlertaCamposFaltando(camposVazios);
   // camposVazios = [];
    return;
  }
      }


      
    );
    
     
    
}

async exibirAlertaCamposFaltando(campos: string[]) {
  const alert = await this.alertController.create({
    header: 'Campos faltando',
    message: `Os seguintes campos precisam ser preenchidos: ${campos.join(', ')}.`,
    buttons: ['OK'],
  });

  await alert.present();
}


async cadastroCliente(){
  const loading = await this.loadingController.create();
  await loading.present();

  const datacliente = {
    name: this.cliente.name,
    email: this.cliente.email,
    phone: this.cliente.phone,
    mobilePhone: this.cliente.mobilePhone, 
    cpfCnpj: this.cliente.cpfCnpj,
    company: this.cliente.company,
    additionalEmails: this.cliente.additionalEmails,
    postalCode: this.cliente.postalCode,
    address: this.cliente.address,
    addressNumber: this.cliente.addressNumber,
    complement: this.cliente.complement,
    province: this.cliente.province,
    city: this.cliente.city,
    state: this.cliente.state,
    observations: this.cliente.observations
  };

  this.clienteService.create(datacliente).subscribe( async (res: any) => {
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


@HostListener('input', ['$event'])
onInput(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.value === '0') {
    this.cliente.cpfCnpj = null;
  }
}


}

