import { Component, OnInit } from '@angular/core';
import { AppStorageService } from '../services/app-storage.service';
import { Title } from '@angular/platform-browser';
import { AlertController, LoadingController } from '@ionic/angular';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { Usuario } from '../interfaces/usuario';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.page.html',
  styleUrls: ['./personal-info.page.scss'],
})
export class PersonalInfoPage implements OnInit {
  users: any[] = [];

  id: any
  cpfCnpj: any
  name: any

  value: any
  email: any;
  mobilePhone: any;
  phone: any;
  company: string = "COOPEERE";
  address: any;
  addressNumber: any;
  city: any;
  province: any;
  postalCode: any;
  state: any;

  

  constructor(
    private title: Title,
    private appStorageService: AppStorageService,
    private alertController: AlertController,
    private adminService: AdminService,
    private router: Router,
    private loadingController: LoadingController,
    
  ) 
  { 
    this.title.setTitle('Informações Pessoais')
  }

  ngOnInit() {
    
    this.adminService.showUsers().subscribe(
      (response: any) => { // Update the parameter type to 'any'
        this.users = response; // Assign the response to the users property
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );

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

  async clearStorage(){
    this.router.navigateByUrl('/onboarding')
    await this.appStorageService.clear()
  }

  closeEditUserPopup() {
    this.showEditUserPopup = false; // Fecha o popup de edição de usuário
  }

  user: any;
  selectedUser: any = null;
  campoEditar: any
  showEditUserPopup = false;

  ativarTodososDados(){
    this.exibirNomeDoUsuario()
    this.exibirCPFDoUsuario()
    this.exibirEmailDoUsuario()
    //this.exibirTokenDoUsuario()
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

  
  async updateUser() {
    const userId = this.selectedUser.id; // ID do usuário a ser atualizado

    // Chame o serviço adequado para atualizar o usuário
    this.adminService.updateUser(userId, this.selectedUser)
      .subscribe(
        async response => {
          //this.refreshPage()
          console.log('Dados atualizados com sucesso:', response);
          this.closeEditUserPopup(); // Fecha o popup de edição de usuário
          const alert = this.alertController.create({
            header: `Tudo certo ${this.appStorageService.get(`name`)}`,
            message: `Seus dados foram atualizados com sucesso`,
            buttons: ['OK']
          })

          ;(await alert).present()

        },
        error => {
          console.error('Erro ao atualizar usuário:', error);
        }
      );
  }

  editUser(user: any) {
    this.selectedUser = { ...user };
    this.showEditUserPopup = true; // Exibe o popup de edição de usuário
  }
  selectUser(user: any) {
    this.selectedUser = { ...user }; // Faz uma cópia do usuário selecionado
  }
  
  async ionViewWillEnter() {
  
    this.ativarTodososDados()
   
    const cpfCnpj = await this.appStorageService.get(`cpfCnpj`)
    // await this.clienteService.getCpfCnpj(`${cpfCnpj}`).subscribe(
    //   async (res: any) => {
    //     this.setCustomerId(res.id)
    //     console.log(res)
    //   }
    // )
  }
  index: any

  async deleteUser(index: number) {
    const alert = await this.alertController.create({
      header: 'Tem certeza de que deseja excluir sua conta?',
      message: ' Ao remover sua conta, todos os seus dados e informações serão permanentemente excluídos do nosso sistema. \n\nEsta ação não pode ser desfeita. Certifique-se de fazer backup de quaisquer dados importantes antes de prosseguir. \n\nEsta ação é irreversível.',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Exclusão cancelada');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            // Chame o método de exclusão de usuário aqui
            this.confirmDeleteUser(index);
            this.router.navigateByUrl('conta-excluida')
          }
        }
      ]
    });
  
    await alert.present();
  }

  confirmDeleteUser(index: number) {
    const userId = this.users[index].id; // Obtenha o ID do usuário a ser excluído
  
    this.adminService.deleteUser(userId)
      .subscribe(
        (response: any) => {
          console.log('Conta deletada', response);
          // Remova o usuário excluído da lista de usuários exibida na tabela
          this.users.splice(index, 1);
        },
        (        error: any) => {
          console.error('Erro ao excluir usuário:', error);
        }
      );
  }
  

  async copiarInformações(){
    
  }

  async exibirNomeDoUsuario(){
    this.name = await this.appStorageService.get(`name`)
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


}
