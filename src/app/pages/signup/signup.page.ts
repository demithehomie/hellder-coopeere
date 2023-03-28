import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Cliente } from 'src/app/interfaces/cliente';
import { Login } from 'src/app/interfaces/login';
import { Usuario } from 'src/app/interfaces/usuario';
import { ClienteService } from 'src/app/services/cliente.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  selectedOption: string = '';
 
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private clienteService: ClienteService,
    public navCtrl: NavController, 
    private http: HttpClient
    ) {}
  
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
  name: "",
  email: "",
  phone: "",
  mobilePhone: "", 
  cpfCnpj: "",
  postalCode: "",
  address: "",
  addressNumber: "",
  complement: "",
  province: "",
  city: "",
  state: "",
  externalReference: "",
  notificationDisabled: false,
  additionalEmails: "",
  municipalInscription: "",
  stateInscription: "",
  observations: "",
}

usuario: Usuario = {
  id: 0,
  email: "",
  senha: "",
  confirma_senha: ""
}

formulario!: FormGroup;

validaForm(){
  this.formulario = this.formBuilder.group({
    name: ['', [Validators.required]],
    cpfCnpj: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    mobilePhone: ['', [Validators.required]],
    address: ['', [Validators.required]],
    addressNumber: ['', [Validators.required]],
    complement: ['', [Validators.required]],
    province: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    postalCode: ['', [Validators.required]],
    externalReference: ['', [Validators.required]],
    additionalEmails: ['', [Validators.required]],
    municipalInscription: ['', [Validators.required]],
    stateInscription: ['', [Validators.required]],
    observations: ['', [Validators.required]],
    groupname: ['', [Validators.required]],
    email: ['', [Validators.required]],
    senha: ['', [Validators.required]],
    confirma_senha: ['', [Validators.required,  this.equalTo('senha')]],
  });
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

cadastro(): void{
  const data = {
  email: this.usuario.email,
  senha: this.usuario.senha
  };
  this.usuarioService.create(data).subscribe({next: (res) => 
  {
    console.log(res);
    console.log("Usuário cadastrado com sucesso")
  },
  error: (e) => console.error(e)
  });
  const datacliente = {
    name: this.cliente.name,
    email: this.cliente.email,
    phone: this.cliente.phone,
    mobilePhone: this.cliente.mobilePhone, 
    cpfCnpj: this.cliente.cpfCnpj,
    postalCode: this.cliente.postalCode,
    address: this.cliente.address,
    addressNumber: this.cliente.addressNumber,
    complement: this.cliente.complement,
    province: this.cliente.province,
    city: this.cliente.city,
    state: this.cliente.state,
  };
  this.clienteService.create(datacliente).subscribe({next: (rescli) => 
    {
      console.log(rescli);
      console.log("Cliente cadastrado com sucesso")
      this.navCtrl.navigateForward('/sms');
    },
    error: (e) => console.error(e)
    });
}

@HostListener('input', ['$event'])
onInput(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.value === '0') {
    this.cliente.cpfCnpj = null;
  }
}

//cpfCnpj: string = '';

formatarCPF() {
  let cpfRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
  if (this.cliente && this.cliente.cpfCnpj) {
    this.cliente.cpfCnpj = this.cliente.cpfCnpj.replace(cpfRegex, '$1.$2.$3-$4');
  }
}

formatarTelefone() {
  let telefoneRegex = /^(\d{2})(\d{5})(\d{4})$/;
  if (this.cliente !== null && this.cliente.mobilePhone !== null) {
    this.cliente.mobilePhone = this.cliente.mobilePhone.replace(telefoneRegex, '($1) $2-$3');
  }
}


}
