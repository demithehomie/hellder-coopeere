import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Subs } from 'src/app/interfaces/assinaturas';
import { Cliente } from 'src/app/interfaces/cliente';
import { PRODIST } from 'src/app/interfaces/prodist';
import { Cobranca, Discount, Fine, Interest } from 'src/app/interfaces/cobranca';
import { ClienteService } from 'src/app/services/cliente.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ProdistService } from 'src/app/services/prodist.service';
import { Title } from '@angular/platform-browser'
import { BehaviorSubject, take } from 'rxjs';
import { from } from 'rxjs';
import { saveAs } from 'file-saver';
import { Clipboard } from '@capacitor/clipboard';
//import { Clipboard } from '@ionic-native/clipboard/ngx';
//import { Plugins } from '@capacitor/core';

import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { AppStorageService } from 'src/app/services/app-storage.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
//import { File } from '@awesome-cordova-plugins/file';

//const { Clipboard } = Plugins
// const { Filesystem, Modals } = Plugins;
// const { Directory, Encoding } = Filesystem;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  selectedCycle!: string;
  value!: number;
  cycle!: string

  dataConvertida! : string;

  name: any=""
  cpfCnpj: any=""
  //value: any="";
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
  
  customer_id: any=""

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
  buscandoCpfCnpj!: Promise<any>;

  dataHoje: Date;
  dataDaquiA30Dias: Date;

  triagemForm!: FormGroup;
  selectedOperadora!: string;

  constructor(
    private appStorageService: AppStorageService,
    private router: Router,
    private authService: AuthenticationService,
    private usuarioService: UsuarioService, 
    private alertController: AlertController,
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
    private prodistService: ProdistService,
    private titleController: Title,
    private loadingController: LoadingController,
    //private transfer: FileTransfer, 
    //private file: File,
    private httpClient: HttpClient,
    //private prodistService: ProdistService,
    private clipboard: Clipboard
    ) {
      this.titleController.setTitle('Home - Coopeere')
      this.operadoraSelecionada = 1; // Defina um valor padrão para a operadora selecionada
      this.ehTitular = true; // Defina um valor padrão para a opção de titularidade
      this.dataHoje = new Date();

      // Use o método setDate() para adicionar 30 dias à data atual
      this.dataDaquiA30Dias = new Date();
      const data_selecionada = this.dataDaquiA30Dias.setDate(this.dataDaquiA30Dias.getDate() + 30);
    }

    
    sairDaSessao() {
      this.alertController.create({
        header: 'Você está prestes a deixar a sessão',
        message: 'Deseja Prosseguir?',
        buttons: [
          {
            text: 'SIM',
            handler: () => {
              this.clearStorage();
              this.router.navigateByUrl('/onboarding'); // Substitua o caminho ("/") pela rota desejada
            }
          },
          {
            text: 'NÃO',
            role: 'cancel'
          }
        ]
      }).then(alert => {
        alert.present();
      });
    }
    

   async copiarLink() {
      const link = 'https://coopeere-eco.web.app'; // Substitua pelo seu link
    
      Clipboard.write({
        string: link
      });
    
      const alert = this.alertController.create({
        header: 'Link Copiado',
        buttons: ['OK']
      });
    
     (await alert).present();
    }
    

    
    // O problema de "Data inválida" ocorre quando os valores passados para criar um objeto `Date` não correspondem a uma data válida. No código fornecido, a variável `selectedDay` é usada para criar a data `this.nextDueDate`. Se o valor de `selectedDay` for maior do que o número de dias no mês selecionado, ou menor do que 1, uma data inválida será criada.

    // Para resolver esse problema, você pode adicionar uma verificação para garantir que `selectedDay` esteja dentro do intervalo válido para o mês selecionado. Você pode fazer isso modificando a função `calculateNextDueDate()` da seguinte forma:
    
    selectedDay!: number;
    nextDueDate: any="";

    days: number[] =  Array.from({length: 30}, (_, i) => i + 1);

    calculateNextDueDate() {
      
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const selectedMonth = currentMonth + 1; // Since JavaScript months are zero-based
    
      let nextMonth;
      let nextYear;
    
      if (selectedMonth === 12) {
        nextMonth = 1;
        nextYear = currentYear + 1;
      } else {
        nextMonth = selectedMonth + 1;
        nextYear = currentYear;
      }
    
      const lastDayOfMonth = new Date(nextYear, nextMonth - 1, 0).getDate();
    
      if (this.selectedDay < 1 || this.selectedDay > lastDayOfMonth) {
        console.log("Dia selecionado é inválido.");
        return;
      }
    
      // this.nextDueDate = new Date(nextYear, nextMonth, this.selectedDay);
      this.nextDueDate = new Date(nextYear, nextMonth - 1, this.selectedDay + 1).toISOString().split('T')[0];

      console.log(this.nextDueDate);
    }
    
    
    // Neste código, a variável `lastDayOfMonth` é usada para obter o último dia do mês selecionado. Em seguida, é feita uma verificação para garantir que `selectedDay` esteja dentro do intervalo válido (entre 1 e `lastDayOfMonth`). Se `selectedDay` estiver fora desse intervalo, uma mensagem de erro será exibida no console e a função será interrompida. Caso contrário, a data será criada corretamente.
  
     
    cycles = [
      { label: 'MENSAL', cycle: 'MONTHLY', value: 3.5 },
      { label: 'BIMESTRAL', cycle: 'BIMONTHLY', value: 7.5 },
      { label: 'TRIMESTRAL', cycle: 'QUARTERLY', value: 10 },
      { label: 'SEMESTRAL', cycle: 'SEMIANNUALY', value: 18 },
      { label: 'ANUAL', cycle: 'ANNUALY', value: 32 }
    ];

    updateValue() {
      switch (this.selectedCycle) {
        case 'MENSAL':
          this.cycle = 'MONTHLY'
          this.value = 3.5; 
          console.log(this.value)
          break;
        case 'BIMESTRAL':
          this.cycle = 'BIMONTHLY'
          this.value = 7.5;
          console.log(this.value)
          break;
        case 'TRIMESTRAL':
          this.cycle = 'QUARTERLY'
          this.value = 10;
          console.log(this.value)
          break;
        case 'SEMESTRAL':
          this.cycle = 'SEMIANNUALY'
          this.value = 18;
          console.log(this.value)
          break;
        case 'ANUAL':
          this.cycle = 'ANNUALY '
          this.value = 32;
          console.log(this.value)
          break;
        default:
          this.value = 0;
      }
    }
    
    
    multipleUpdate(){

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

selectedFile!: File;

handleFileInput(event: any) {
  this.selectedFile = event.target.files[0];
}

upload() {
  if (this.selectedFile) {
    // Aqui você pode enviar o arquivo para o servidor ou realizar outras ações necessárias
    console.log('Arquivo selecionado:', this.selectedFile);
    /*
    this.prodistService.enviarContaDeLuz().subscribe(
      async (res: any){
        console.log('Arquivo enviado:', this.selectedFile);
      }
    )
    */
  } else {
    console.log('Nenhum arquivo selecionado.');
  }
}

setCustomerId(id: string){
  this.appStorageService.set(`customer_id`, `${id}`)
}

async ionViewWillEnter() {
  
  this.ativarTodososDados()
 
  const cpfCnpj = await this.appStorageService.get(`cpfCnpj`)
  await this.clienteService.getCpfCnpj(`${cpfCnpj}`).subscribe(
    async (res: any) => {
      this.setCustomerId(res.id)
      console.log(res)
    }
  )
}
//

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
  this.router.navigateByUrl('/onboarding')
  this.authService.logout()
  await this.appStorageService.clear()
}

selectFile(){
  
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
  } else if (this.selectedTab === 'option7') {
    this.selectedTab = 'option8';
  }
}

previousPage() {
  if (this.selectedTab === 'option8'){
    this.selectedTab = 'option7';
  } else if (this.selectedTab === 'option7'){
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

    converterTimestampParaData(timestamp: number): string {
      const data = new Date(timestamp);
      const year = data.getFullYear();
      const month = String(data.getMonth() + 1).padStart(2, '0');
      const day = String(data.getDate()).padStart(2, '0');
  
      return `${year}-${month}-${day}`;
    }
    
  payments!: FormGroup

  subs: Subs = {
    customer:  '',//`${await this.appStorageService.get(`customer_id`)}`,
    billingType: '',  //subs.billingType
    nextDueDate: '',
    value: 0,
    cycle: '',
    description: 'COOPEERE',
    discount: {
      value: 0.00,
        dueDateLimitDays: 1
    },
    fine: {
      value: 1.00,
    },
    interest: {
      value: 2.00
    }
  }

   async payingSubs(){
      const loading = await this.loadingController.create();
      await loading.present();


    this.dataDaquiA30Dias = new Date();
      const data_selecionada = this.dataDaquiA30Dias.setDate(this.dataDaquiA30Dias.getDate() + 30);

    await loading.dismiss();
      const datapayment = {
        customer: `${await this.appStorageService.get(`customer_id`)}`,
        billingType: this.subs.billingType,
        nextDueDate: this.converterTimestampParaData(data_selecionada),
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
      this.clienteService.generateSubs(datapayment).subscribe(
        async (res: any) =>  {
          console.log(datapayment)
          await loading.dismiss();
          console.log(res);
          console.log("Pagamento efetuado cadastrado com sucesso")
         // this.navCtrl.navigateForward('/sms');
         const alert = this.alertController.create({
          header: `Pagamento Concluído com Sucesso!`,
          message: `Verifique seu email para mais informações`,
          buttons: ['OK']
        });
        (await alert).present()
        },
        async (res: { error: any}) => {
          console.log(res.error)
          console.log(datapayment)
          const alert = this.alertController.create({
            header: `Pagamento não-concluído`,
            message: `Verifique o formulário e tente novamente`,
            buttons: ['OK']
          });
          (await alert).present()
        }
    
        );
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

  setNumeroDoCliente(NumeroDoCliente: any){
   this.appStorageService.set(`NumeroDoCliente`, `${NumeroDoCliente}`) 
  }


  bigProdist!: FormGroup;

validaFormProdist(){
  this.bigProdist = this.formBuilder.group({
 
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
  
  this.prodistService.create(this.bigProdist.value).subscribe(
    async (res: any) => {
      this.setNumeroDoCliente(res.NumeroDoCliente)
      console.log(res)
      const alert = this.alertController.create({
        header: `Formulário Atualizado com Sucesso`,
        message: `Se desejar, faça o download agora mesmo`,
        buttons: ['OK']
      });
      
      (await alert).present()
      
    },
    async (res: { error: any}) => {
      console.log(res.error)
      const alert = this.alertController.create({
        header: `O formulário não foi atualizado`,
        message: `Verifique as informações inserida e tente novamente`,
        buttons: ['OK']
      });
      (await alert).present()
    }
  )

  }

  async submitTriagemForm() {
    if (this.triagemForm.valid) {
      const operadora = this.triagemForm.value.operadora;
      const tipoConta = this.triagemForm.value.tipoConta;

      // Enviar dados para o serviço e salvar no banco de dados
      try {
        const loading = await this.loadingController.create();
        await loading.present();

        // Aqui você precisa adaptar para os campos corretos do seu formulário
        const dadosFormulario = {
          operadora: operadora,
          tipoConta: tipoConta
        };

        await this.prodistService.cadastrarNoBancoDeDados(dadosFormulario); // Chame o método apropriado do seu serviço

        await loading.dismiss();

        // Exiba um alerta de sucesso ou redirecione para outra página
        const alert = await this.alertController.create({
          header: 'Tudo certo!',
          message: 'Dados cadastrados com sucesso.',
          buttons: ['OK']
        });

        await alert.present();
      } catch (error) {
        // Trate qualquer erro que possa ocorrer durante o envio dos dados
        const loading = await this.loadingController.create();
        await loading.present();

        await loading.dismiss();

        // Exiba um alerta de erro ou tome outras ações necessárias
        const alert = await this.alertController.create({
          header: 'Falha no cadastro',
          message: 'Não foi possível cadastrar os dados.',
          buttons: ['OK']
        });

        await alert.present();
      }
    }
  }



  getTitularLabel() {
    return this.triagemForm.get('mensagemTriagemTitular')?.value;
  }
  
  getNaoTitularLabel() {
    return this.triagemForm.get('mensagemTriagemNaoTitular')?.value;
  }
  
  updateFormLabels() {
    const ehTitular = this.triagemForm.get('ehTitular')?.value;
    const operadora = this.triagemForm.get('operadora')?.value;
  
    if (operadora === 'Enel-RJ') {
      if (ehTitular === 'true') {
        this.triagemForm.get('mensagemTriagemTitular')?.setValue('Tenho uma conta Enel-RJ em meu nome. (Preencha o formulário PRODIST ANEEL com os dados desta conta)');
        this.triagemForm.get('mensagemTriagemNaoTitular')?.setValue('Não sou titular de uma conta Enel-RJ, mas me cadastrarei com o Link convite que me foi enviado ou o farei sem convite por livre e espontânea vontade para apoiar a cooperativa. (você será um Cooperado Apoiador)');
      } else {
        this.triagemForm.get('mensagemTriagemTitular')?.setValue('');
        this.triagemForm.get('mensagemTriagemNaoTitular')?.setValue('');
      }
    } else if (operadora === 'Light-RJ') {
      if (ehTitular === 'true') {
        this.triagemForm.get('mensagemTriagemTitular')?.setValue('Tenho uma conta Light-RJ em meu nome. (Preencha o formulário PRODIST ANEEL com os dados desta conta)');
        this.triagemForm.get('mensagemTriagemNaoTitular')?.setValue('Não sou titular de uma conta Light-RJ, mas me cadastrarei com o Link convite que me foi enviado ou o farei sem convite por livre e espontânea vontade para apoiar a cooperativa. (você será um Cooperado Apoiador)');
      } else {
        this.triagemForm.get('mensagemTriagemTitular')?.setValue('');
        this.triagemForm.get('mensagemTriagemNaoTitular')?.setValue('');
      }
    } else if (operadora === 'Enel-SP') {
      if (ehTitular === 'true') {
        this.triagemForm.get('mensagemTriagemTitular')?.setValue('Tenho uma conta Enel-SP em meu nome. (Preencha o formulário PRODIST ANEEL com os dados desta conta)');
        this.triagemForm.get('mensagemTriagemNaoTitular')?.setValue('Não sou titular de uma conta Enel-SP, mas me cadastrarei com o Link convite que me foi enviado ou o farei sem convite por livre e espontânea vontade para apoiar a cooperativa. (você será um Cooperado Apoiador)');
      } else {
        this.triagemForm.get('mensagemTriagemTitular')?.setValue('');
        this.triagemForm.get('mensagemTriagemNaoTitular')?.setValue('');
      }
    }
  }
  
  

  ngOnInit() {

    this.triagemForm = this.formBuilder.group({
      operadora: ['Enel-RJ'],
      ehTitular: ['true'],
      mensagemTriagemTitular: ['Tenho uma conta Enel-RJ em meu nome. (Preencha o formulário PRODIST ANEEL com os dados desta conta)'],
      mensagemTriagemNaoTitular: ['Não sou titular de uma conta Enel-RJ, mas me cadastrarei com o Link convite que me foi enviado ou o farei sem convite por livre e espontânea vontade para apoiar a cooperativa. (você será um Cooperado Apoiador)']
  });    

    this.triagemForm.get('operadora')?.valueChanges.subscribe((value) => {
      this.updateFormLabels();
    });
 
    this.validaFormProdist();
   
    this.payments = this.formBuilder.group({
      object: ['', [Validators.required]],
    
      customer_id: ['', [Validators.required]],
      value: ['', [Validators.required]],
      billingType: ['', [Validators.required]],
      nextDueDate: ['', [Validators.required]],
      cycle: ['', [Validators.required]],
      description: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      fine: ['', [Validators.required]],
      interest: ['', [Validators.required]],
    }); 
  }

  async emissaoDoPdf() {

    const loading = await this.loadingController.create();
    await loading.present();
    const id = await this.appStorageService.get('id');
    const NumeroDoCliente = await this.appStorageService.get('NumeroDoCliente');
 
  
    from(this.prodistService.imprimirPdf(id, NumeroDoCliente)).subscribe(
      async (res: any) => {
        console.log(res);
        await loading.dismiss();
      },
      async (res: {error: any}) => {
        console.log(res.error);
        await loading.dismiss();
      }
    );
  }

  async gerarPDFSingle() {
    const id = await this.appStorageService.get('id'); // Recupera o valor do id do localStorage
    const NumeroDoCliente = await this.appStorageService.get('NumeroDoCliente'); // Recupera o valor do NumeroDoCliente do localStorage
  
    const apiurl = `https://grandfinale.onrender.com`
    if (id && NumeroDoCliente) {
      const url = `${apiurl}/usuarios/pdf-single/${id}/${NumeroDoCliente}`;
      const headers = new HttpHeaders({ 'Content-Type': 'application/pdf' });
  
      this.httpClient.get(url, { headers, responseType: 'blob' })
        .subscribe(async (response: Blob) => {
          const filename = `FormularioPRODIST-${NumeroDoCliente}-${id}.pdf`;
          saveAs(response, filename);
          console.log(url, id, NumeroDoCliente, response);
          const alert = this.alertController.create({
            header: `Baixando PDF do Formulário PRODIST!`,
            message: `O download iniciara´em alguns instantes`,
            buttons: ['OK']
          });
          (await alert).present()
          
        }, async (error) => {
          // Trate os erros da requisição GET
          console.log(error);
          const alert = this.alertController.create({
            header: `Não foi possível baixar o PDF!`,
            message: `Erro na requisição GET`,
            buttons: ['OK']
          });
          (await alert).present()
        });
    } else {
      // Trate o caso em que os valores não estão armazenados
      const alert = this.alertController.create({
        header: `Não foi possível baixar o PDF!`,
        message: `Não existem valores armazenados`,
        buttons: ['OK']
      });
      (await alert).present()
    }
  
    }
  

  ////////////

  }
