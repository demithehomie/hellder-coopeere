import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Subs } from 'src/app/interfaces/assinaturas';
import { Cliente } from 'src/app/interfaces/cliente';
import { PRODIST } from 'src/app/interfaces/prodist';
import { Cobranca, Discount, Fine, Interest } from 'src/app/interfaces/cobranca';
import { ClienteService } from 'src/app/services/cliente.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ProdistService } from 'src/app/services/prodist.service';
import { Title } from '@angular/platform-browser'
import { BehaviorSubject, take } from 'rxjs';
import { Plugins } from '@capacitor/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppStorageService } from 'src/app/services/app-storage.service';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
//import { File } from '@awesome-cordova-plugins/file';


// const { Filesystem, Modals } = Plugins;
// const { Directory, Encoding } = Filesystem;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  name: any=""
  cpfCnpj: any=""
  value: any="";
  mobilePhone: any=""
  phone: any=""
  company: any=""
  email: any=""
  id: any=""
  address: any=""
  city: any=""
  province: any=""
  postalCode: any=""
  state: any=""
  addressNumber: any=""
  
  res: any="";
  accessToken: any="";

    operadoraSelecionada: number;
    ehTitular: boolean;

  frequenciaPagamento: string | any ;
  formaPagamento: string = "";
  valorTotal: number = 0;

  data: any;
  selectedTab: string = "option1";
 // selectedOption: string = "pix";
  opcaoPagamento: string = ""; 
  valoresFrequencia: any;

  fullName$ = new BehaviorSubject<string | null | undefined>(null);
  fullName = '';

  constructor(
    private appStorageService: AppStorageService,
    private usuarioService: UsuarioService, 
    private alertController: AlertController,
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
    private prodistService: ProdistService,
    private titleController: Title,
    //private transfer: FileTransfer, 
    //private file: File,
    private httpClient: HttpClient
    //private prodistService: ProdistService
    ) {
      this.titleController.setTitle('Home - Coopeere')
      this.operadoraSelecionada = 1; // Defina um valor padrão para a operadora selecionada
      this.ehTitular = true; // Defina um valor padrão para a opção de titularidade
    }
     
    
//     const fileTransfer: FileTransferObject = this.transfer.create();

// // Upload a file:
// fileTransfer.upload(..).then(..).catch(..);

// // Download a file:
// fileTransfer.download(..).then(..).catch(..);

// // Abort active transfer:
// fileTransfer.abort();

// // full example
// upload() {
//   let options: FileUploadOptions = {
//      fileKey: 'file',
//      fileName: 'name.jpg',
//      headers: {},
//      // .....
//   };

//   fileTransfer.upload('<file path>', '<api endpoint>', options)
//    .then((data) => {
//      // success
//    }, (err) => {
//      // error
//    });
// }

// download() {
//   const url = 'http://www.example.com/file.pdf';
//   fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
//     console.log('download complete: ' + entry.toURL());
//   }, (error) => {
//     // handle error
//   });
// }

ionViewWillEnter() {
  this.ativarTodososDados()
}


ativarTodososDados(){
  this.exibirNomeDoUsuario()
  this.exibirCPFDoUsuario()
  this.exibirEmailDoUsuario()
  this.exibirTokenDoUsuario()
  this.exibirMobilePhone()
  this.exibirPhone()
  this.exibirCompany()
  this.exibirID()
  this.exibirEndereco()
  this.exibirNumero()
  this.exibirCidade()
  this.exibirBairro()
  this.exibirCEP()
  this.exibirEstado()
}
  

async exibirTokenDoUsuario(){
  this.value = await this.appStorageService.get(`token`)
}

async exibirNomeDoUsuario(){
  this.name = await this.appStorageService.get(`name`)
}

async removerNome(){
  await this.appStorageService.remove('name')
}

async exibirEmailDoUsuario(){
  this.email = await this.appStorageService.get(`email`)
}

async exibirCPFDoUsuario(){
  this.cpfCnpj = await this.appStorageService.get(`cpfCnpj`)
}

async exibirMobilePhone(){
  this.mobilePhone = await this.appStorageService.get(`mobilePhone`)
}

async exibirPhone(){
  this.phone = await this.appStorageService.get(`phone`)
}


async exibirCompany(){
  this.company = await this.appStorageService.get(`company`)
}

async exibirID(){
  this.id = await this.appStorageService.get(`id`)
}

async exibirEndereco(){
  this.address = await this.appStorageService.get(`address`)
}

async exibirNumero(){
  this.addressNumber = await this.appStorageService.get(`addressNumber`)
}


async exibirCidade(){
  this.city = await this.appStorageService.get(`city`)
}

async exibirBairro(){
  this.province = await this.appStorageService.get(`province`)
}

async exibirCEP(){
  this.postalCode = await this.appStorageService.get(`postalCode`)
}

async exibirEstado(){
  this.state = await this.appStorageService.get(`state`)
}

async setToken(res: any, accessToken:any) {
  //await this.users.setToken(res)
  //await this.appStorageService.set('token', `${accessToken}`)
}

///////////////////////

async setValue() {
  await this.appStorageService.set('testando', '123')
}



async getValue() {
  this.value = await this.appStorageService.get('testando')
}

async removeValue(){
  await this.appStorageService.remove('testando')
}

async clearStorage(){
  await this.appStorageService.clear()
}

  

selectFile(){
  
}


    calcularValorTotal() {
      // Definindo os valores para cada frequência de pagamento
      const valoresFrequencia = {
        mensal: 3.50,
        bimestral: 7.50,
        trimestral: 10.00,
        semestral: 18.00,
        anual: 32.00
      };
  
     // this.valorTotal = number;
      // Calculando o valor total com base na frequência de pagamento selecionada
      this.valorTotal = this.valoresFrequencia[this.frequenciaPagamento];
    }
  

    /*



    selecionarFormaPagamento(forma: string) {
      this.formaPagamento = forma;
    }

  // Método para lidar com a seleção de uma nova opção
  onChangeOption(option: string) {
    this.selectedOption = option; // Atualiza a variável selectedOption com a nova opção selecionada
  }

  // Método para verificar se uma opção está selecionada
  isOptionSelected(option: string): boolean {
    return this.selectedOption === option; // Retorna true se a opção atual for a selecionada, caso contrário, retorna false
  }
*/
  ngOnInit() {
    this.validaFormProdist();
    this.usuarioService.getData(this.data).subscribe(data => {
      this.data = data;
    });

    this.clienteService.userFullName
    .pipe(take(1))
    .subscribe((fullName: string | null | undefined) => {
      this.fullName = fullName !== null && fullName !== undefined ? fullName : '';

      this.fullName$.next(fullName);
    });
  }

  

  nextPage() {
    if (this.selectedTab === 'option1') {
      this.selectedTab = 'option2';
    } else if (this.selectedTab === 'option2') {
      this.selectedTab = 'option3';
    } else if (this.selectedTab === 'option3') {
      this.selectedTab = 'option4';
    } else if (this.selectedTab === 'option4') {
      this.selectedTab = 'option5';
    } else if (this.selectedTab === 'option5') {
      this.selectedTab = 'option6';
    } else if (this.selectedTab === 'option6') {
      this.selectedTab = 'option7';
    }

  }

  previousPage() {
    if (this.selectedTab === 'option7'){
      this.selectedTab = 'option6';
    } else if (this.selectedTab === 'option6'){
      this.selectedTab = 'option5';
    } else if (this.selectedTab === 'option5'){
      this.selectedTab = 'option4';
    } else if (this.selectedTab === 'option4'){
      this.selectedTab = 'option3';
    } else if (this.selectedTab === 'option3'){
      this.selectedTab = 'option2';
    } else if (this.selectedTab === 'option2'){
      this.selectedTab = 'option1';
    }




  }

  async alertaDeSaida() {
    const alert = await this.alertController.create({
      header: 'Tem certeza?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Não',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Sim',
          cssClass: 'alert-button-confirm',
          
        },
      ],
    });

    await alert.present();
  }

  verificarPagamento() {
    if (this.opcaoPagamento) {
      this.exibirAlerta('Opção selecionada: ' + this.opcaoPagamento);
    } else {
      this.exibirAlerta('Por favor, selecione uma opção de pagamento.');
    }
  }

  async exibirAlerta(mensagem: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();


  }

  ////////// PAGAMENTO



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
    address: "",
    state: "",
    province: "",
    city: "",
    addressNumber: "",
    complement: "",
    municipalInscription: "",
    stateInscription: "",
    additionalEmails: [],
    externalReference: "",
    notificationDisabled: false,
    observations: "",
  }

  subs: Subs = {
    customer: '',
    billingType: '',  //subs.billingType
    nextDueDate: '',
    value: 0,
    cycle: '',
    description: '',
    discount: {
      value: 0.00,
        dueDateLimitDays: 0
    },
    fine: {
      value: 1.00,
    },
    interest: {
      value: 2.00
    }
  }

  cobranca: Cobranca = {
    customer: " ",
    billingType: " ",
    dueDate: " ",
    value: 0,
    description: "",
    postalService: false,
    externalReference: '',
    discount: {
      value: 0.00,
        dueDateLimitDays: 0
    },
    fine: {
      value: 1.00,
    },
    interest: {
      value: 2.00
    }
  }


  discount: Discount =  {  // SERÁ NECESSÁRIA UMA INTERFACE DE ADMIN ONDE ESSES DADOS SERÃO ALTERADOS QUANDO NECESSÁRIO
        value: 10.00,
        dueDateLimitDays: 0
    }
    
    fine: Fine = { // SERÁ NECESSÁRIA UMA INTERFACE DE ADMIN ONDE ESSES DADOS SERÃO ALTERADOS QUANDO NECESSÁRIO
        value: 1.00
    }
    interest:  Interest = { // SERÁ NECESSÁRIA UMA INTERFACE DE ADMIN ONDE ESSES DADOS SERÃO ALTERADOS QUANDO NECESSÁRIO
        value: 2.00
    }


    payingSubs(): void{
      const dataclient = {
        name: this.cliente.name,
    email: this.cliente.email,
    phone: this.cliente.phone,
        
      };
      this.clienteService.create(dataclient).subscribe({next: (res) => 
      {
        console.log(res);
        console.log("Dados de Pagamento salvos com sucesso")
      },
      error: (e) => console.error(e)
      });
      const datapayment = {
        customer: this.subs.customer,
        billingType: this.subs.billingType,
        nextDueDate: this.subs.nextDueDate,
        value: this.subs.value,
    description: this.subs.description,
    cycle: this.subs.cycle,
   
    discount: {
      value: this.discount.value,
        dueDateLimitDays: this.discount.dueDateLimitDays
    },
    fine: {
      value: this.fine.value,
    },
    interest: {
      value: this.interest.value
    }


   
      };
      this.clienteService.create(datapayment).subscribe({next: (rescli) => 
        {
          console.log(rescli);
          console.log("Pagamento efetuado cadastrado com sucesso")
         // this.navCtrl.navigateForward('/sms');
        },
        error: (e) => console.error(e)
        });
    }

    ///// TRIAGEM

    selecionarOperadora(operadora: number) {
      this.operadoraSelecionada = operadora;
    }
  
    selecionarTitularidade(titular: boolean) {
      this.ehTitular = titular;
    }
    
    submitForm() {
      // Aqui você pode processar os dados do formulário
      console.log('Operadora selecionada:', this.operadoraSelecionada);
      console.log('Titularidade:', this.ehTitular);
  
      // Você também pode enviar os dados para um serviço ou executar outras ações necessárias
      // Exemplo:
      this.prodistService.enviarDadosTriagem(this.operadoraSelecionada, this.ehTitular)
        .subscribe(response => {
          console.log('Dados enviados com sucesso');
        }, error => {
          console.error('Erro ao enviar dados do formulário', error);
        });
    }

    ////// PRODIST /////

    prodist: PRODIST = {
      ContaDeLuz: "",
      NumeroDoCliente: "",
      ClasseUC: "",
      CotaMensal: "",
      PotenciaInstalada: "",
      TensaoDeAtendimento: "",
      TipoDeConexao: "",
      TipoDeRamal: "",
      PotenciaInstaladaGeral: "",
      TipoDaFonteDeGeracao: "",
      MenorConsumoUltimos12: "",
      MaiorConsumoUltimos12: "",
  }

  formularioProdist!: FormGroup;

  uploadContaDeLuz(){

  }

validaFormProdist(){
  this.formularioProdist = this.formBuilder.group({
 
   ContaDeLuz: ['', [Validators.required]],
   NumeroDoCliente: ['', [Validators.required]],
   ClasseUC: ['', [Validators.required]],
   CotaMensal: ['', [Validators.required]],
   PotenciaInstalada: ['', [Validators.required]],
   TensaoDeAtendimento: ['', [Validators.required]],
   TipoDeConexao: ['', [Validators.required]],
   TipoDeRamal: ['', [Validators.required]],
   PotenciaInstaladaGeral: ['', [Validators.required]],
   TipoDaFonteDeGeracao: ['', [Validators.required]],
   MenorConsumoUltimos12: ['', [Validators.required]],
   MaiorConsumoUltimos12: ['', [Validators.required]],

  });
}

cadastroProdist(): void{
  const dataprodist = {
    ContaDeLuz: this.prodist.ContaDeLuz,
    NumeroDoCliente: this.prodist.NumeroDoCliente,
    ClasseUC: this.prodist.ClasseUC,
    CotaMensal: this.prodist.CotaMensal,
    PotenciaInstalada: this.prodist.PotenciaInstalada,
    TensaoDeAtendimento: this.prodist.TensaoDeAtendimento, 
    TipoDeConexao: this.prodist.TipoDeConexao,
    TipoDeRamal: this.prodist.TipoDeRamal,
    PotenciaInstaladaGeral: this.prodist.PotenciaInstaladaGeral,
   TipoDaFonteDeGeracao: this.prodist.TipoDaFonteDeGeracao,
    MenorConsumoUltimos12: this.prodist.MenorConsumoUltimos12,
    MaiorConsumoUltimos12: this.prodist.MaiorConsumoUltimos12,

  };
  this.prodistService.create(dataprodist).subscribe({next: (res) => 
  {
    console.log(res);
    console.log("Formulário PRODIST cadastrado com sucesso")
  },
  error: (e) => console.error(e)
  });


    ///////
   
}
}
  ////////////


