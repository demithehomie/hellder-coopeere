import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ViaCepResponse } from 'src/app/interfaces/viacep';
import { NgForm } from '@angular/forms';
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

  title = 'Cadastro';
  selectedOption: string = '';


/*
  postalCode: string = "";
  address: string = "";
  province: string = "";
  city: string = "";
  state: string = "";


  fulladdress: ViaCepResponse = {
    postalCode: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    uf: ''
  };
 */

  ClienteUsuarioForm: FormGroup;

  constructor(
    
    
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private clienteService: ClienteService,
    public navCtrl: NavController, 
    private http: HttpClient,
    
    ) {

      
    this.ClienteUsuarioForm = new FormGroup({
      cliente: new FormGroup({
        name: new FormControl(),
        email: new FormControl(),
        cpfCnpj: new FormControl(),
        company: new FormControl(),
        mobilePhone: new FormControl(),
        phone: new FormControl()
      }),
      usuario: new FormGroup({
       
        name: new FormControl(),
        email: new FormControl(),
        cpfCnpj: new FormControl(),
        company: new FormControl(),
        mobilePhone: new FormControl(),
        phone: new FormControl(),
        password: new FormControl(),
        confirma_senha: new FormControl()
      })
    });
    
    }

  /*  
  submitForm() {
    const postalCode = this.usuario.postalCode.replace(/\D/g, '');
    const viacepdata = {
   
    }
    this.http.get<ViaCepResponse>(`https://viacep.com.br/ws/${postalCode}/json/`)
      .subscribe(res => {
        this.usuario.address = res.logradouro;
        this.usuario.province = res.bairro;
        this.usuario.city = res.cidade;
        this.usuario.state = res.uf;
        // Aqui você pode enviar o formulário para o banco de dados usando um serviço ou diretamente aqui
      });
      this.usuarioService.create(viacepdata).subscribe({next: (res) => 
        {
          console.log(res);
          console.log("Endereço do usuário cadastrado com sucesso")
        },
        error: (e) => console.error(e)
        });
  }
  

  consultaCep(valor: any, form: any){
    this.usuarioService.buscarCep(valor).subscribe((dados) => this.popularForm(dados, form))
  }

  popularForm(dados: any, form: any){
    form.setValue({
      postalCode: dados.cep,
      address: dados.logradouro,
      province: dados.bairro,
      city: dados.localidade,
      state: dados.uf

    })
  }
  */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    return filterValue;
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
this.validaForm();



  this.http.get('assets/buscarcep.js', { responseType: 'text'})
    .subscribe(js => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = js;
    document.body.appendChild(script);
  });
}

validarSenha(formGroup: FormGroup) {
  const senhaControl = formGroup.get('password');
  const confirmacaoSenhaControl = formGroup.get('confirmacaoSenha');
  if (senhaControl!.value !== confirmacaoSenhaControl!.value) {
    confirmacaoSenhaControl!.setErrors({ senhaDiferente: true });
  } else {
    confirmacaoSenhaControl!.setErrors(null);
  }
}


onSubmit() {
  const usuario = this.ClienteUsuarioForm.get('usuario')!.value;
  const cliente = this.ClienteUsuarioForm.get('cliente')!.value;
  this.usuarioService.create(usuario).subscribe({next: (res) => 
    {
      console.log(res);
      console.log("Usuário cadastrado com sucesso")
    },
    error: (e) => console.error(e)
  });
  this.clienteService.create(cliente).subscribe({next: (rescli) => 
    {
      console.log(rescli);
      console.log("Cliente cadastrado com sucesso")
      this.navCtrl.navigateForward('/email');
    },
    error: (e) => console.error(e)
    });
  // Aqui você pode fazer a chamada para a API ou salvar no banco de dados
  console.log('Dados do usuário:', usuario);
  console.log('Dados do cliente:', cliente);
}

validaForm(){
  this.ClienteUsuarioForm = this.formBuilder.group({
    usuario: this.formBuilder.group({
      name: ['', Validators.required],
      cpfCnpj: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      mobilePhone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      company: ['', [Validators.required]],
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.minLength(6)],
      confirmacaoSenha: [''], }, {}),
   
      cliente: this.formBuilder.group({
        name: ['', Validators.required],
        cpfCnpj: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        mobilePhone: ['', [Validators.required]],
        address: ['', [Validators.required]],
        company: ['', [Validators.required]],
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
        email: ['', [Validators.required, Validators.email]],
        
    })
  });
}

cliente: Cliente = {
  id: "",
  name: "",
  email: "",
  company: "",
//	password : " ",  
  cpfCnpj: "",
  mobilePhone: "",
  phone: "",
  postalCode: "",
  address: " ",
  state: "ccc",
  province: "ccc",
  city: "ccc",
  addressNumber: "",
  complement: "",
  municipalInscription: "",
  stateInscription: "",
  additionalEmails: [],
  externalReference: "",
  notificationDisabled: false,
  observations: "",
}

usuario: Usuario = {
  id: 0,
  role: 1,
  name: "",
	email : "",
	company : "",

	cpfCnpj : "",
	mobilePhone : "",
	phone : "",
	postalCode : "",
	address : "",
	state : "",
  province: "",
	city : "",
	addressNumber : "",
	complement : "",
	municipalInscription: "",
	stateInscription: "",
	additionalEmails: [],
    externalReference: "",
    notificationDisabled: false,
    observations: "",

  password: "",
  confirma_senha: ""
}

/*
formulario!: FormGroup;

validaForm(){
  this.formulario = this.formBuilder.group({
   // role: ['', [1]],
    name: ['', [Validators.required]],
    cpfCnpj: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    mobilePhone: ['', [Validators.required]],
    address: ['', [Validators.required]],
    company: ['', [Validators.required]],
    addressNumber: ['', [Validators.required]],
  //  complement: ['', [Validators.required]],
    province: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    postalCode: ['', [Validators.required]],
    externalReference: ['', [Validators.required]],
    additionalEmails: ['', [Validators.required]],
  //  municipalInscription: ['', [Validators.required]],
   // stateInscription: ['', [Validators.required]],
    observations: ['', [Validators.required]],
    groupname: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirma_senha: ['', [Validators.required,  this.equalTo('password')]],
  });
}
*/
equalTo(field_name: string) {
  return (control: any) => {
    const field = control.parent?.get(field_name);
    if (field && control.value !== field.value) {
      return { equalTo: true };
    }
    return null;
  };
}
/*
cadastro(): void{
  const data = {
    role: this.usuario.role,
    name: this.usuario.name,
    email: this.usuario.email,
    company: this.usuario.company,
    phone: this.usuario.phone,
    mobilePhone: this.usuario.mobilePhone, 
    cpfCnpj: this.usuario.cpfCnpj,
    postalCode: this.usuario.postalCode,
    address: this.usuario.address,
   state: this.usuario.state,
    province: this.usuario.province,
    city: this.usuario.city,
    addressNumber: this.usuario.addressNumber,
   // complement: this.usuario.complement,
   // municipalInscription: this.usuario.municipalInscription,
   additionalEmails: this.usuario.additionalEmails,
  //  stateInscription: this.usuario.stateInscription,
    observations: this.usuario.observations,
    password: this.usuario.password,
    
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
    company: this.cliente.company,
    mobilePhone: this.cliente.mobilePhone, 
    cpfCnpj: this.cliente.cpfCnpj,
    postalCode: this.cliente.postalCode,
    address: this.cliente.address,
    state: this.cliente.state,
    province: this.cliente.province,
    city: this.cliente.city,
    addressNumber: this.cliente.addressNumber,
    complement: this.cliente.complement,
    municipalInscription: this.cliente.municipalInscription,
    stateInscription: this.cliente.stateInscription,
    additionalEmails: this.cliente.additionalEmails,
    observations: this.cliente.observations
  };
  this.clienteService.create(datacliente).subscribe({next: (rescli) => 
    {
      console.log(rescli);
      console.log("Cliente cadastrado com sucesso")
      this.navCtrl.navigateForward('/email');
    },
    error: (e) => console.error(e)
    });
}
*/



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
  if (this.usuario && this.usuario.cpfCnpj) {
    this.usuario.cpfCnpj = this.usuario.cpfCnpj.replace(cpfRegex, '$1.$2.$3-$4');
  }
}

formatarTelefone() {
  let telefoneRegex = /^(\d{2})(\d{5})(\d{4})$/;
  if (this.cliente !== null && this.cliente.mobilePhone !== null) {
    this.cliente.mobilePhone = this.cliente.mobilePhone.replace(telefoneRegex, '($1) $2-$3');
  }
}

/*
pesquisarCep() {
  let postalCode = this.postalCode.replace(/\D/g, '');
  if (postalCode != "") {
    let validacep = /^[0-9]{8}$/;
    if(validacep.test(postalCode)) {
      this.http.get(`https://viacep.com.br/ws/${postalCode}/json/`).subscribe((resultado: any) => {
        if (!("erro" in resultado)) {
          this.address = resultado.logradouro;
          this.province = resultado.bairro;
          this.city = resultado.localidade;
          this.state = resultado.uf;
          
        } else {
          this.limparCampos();
          alert("CEP não encontrado.");
        }
      });
    } else {
      this.limparCampos();
      alert("Formato de CEP inválido.");
    }
  } else {
    this.limparCampos();
  }
}

limparCampos() {
  this.address = "";
  this.province = "";
  this.city = "";
  this.state = "";
  }
*/
}


