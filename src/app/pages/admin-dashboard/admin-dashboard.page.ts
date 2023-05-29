import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';
import { AppStorageService } from 'src/app/services/app-storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {
  users: any[] = []; // Initialize users as an empty array

  newUser: any = {}; // Objeto para armazenar os dados do novo usuário
  newAdmin: any = {}; // Objeto para armazenar os dados do co novo administrador
  showAddUserPopup = false; // Variável para controlar a exibição do popup
  showEditUserPopup = false;
  showAddAdminPopup = false;
  showEditAdminPopup = false;
  
  role: number = 1
  name!: any
  email!: any
  phone!: any
  company: string = 'COOPEERE'
  additionalEmails: string = 'faleconosco@coopeere.eco.br'
  mobilePhone!: any 
  cpfCnpj!: any
  postalCode!: any
  address!: any
  addressNumber!: any
  complement!: any
  province!: any
  city!: any
  state!: any
  password!: any
  observations: string = 'Cooperado da COOPEERE'

  nameError!: boolean;
  emailError!: boolean;
  phoneError!: boolean;
  cpfCnpjError!: boolean;
  mobilePhoneError!: boolean;
  postalCodeError!: boolean;
  addressError!: boolean;
  addressNumberError!: boolean;
  complementError!: boolean;
  provinceError!: boolean;
  cityError!: boolean;
  stateError!: boolean;
  passwordError!: boolean;

  constructor(
    private adminService: AdminService,
    private usersService: UsuarioService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private title: Title,
    private router: Router,
    private appStorageService: AppStorageService

    // https://grandfinale.onrender.com
     
    ) {
      this.title.setTitle('Área de Admin')
    }

 // users
 async clearStorage(){
  this.router.navigateByUrl('/onboarding')
  await this.appStorageService.clear()
}
// users = this.adminService.showUsers()

refreshPage() {
  window.location.reload();
}
  
  selectedUser: any = null;

  selectUser(user: any) {
    this.selectedUser = { ...user }; // Faz uma cópia do usuário selecionado
  }

  closePopup() {
    this.selectedUser = null;
  }


  addUser() {
    this.showAddUserPopup = true; // Exibe o popup de adicionar usuário
  }

  addAdmin(){
    this.showAddAdminPopup = true; 
  }

  closeAddUserPopup() {
    this.showAddUserPopup = false; // Fecha o popup de adicionar usuário
    this.newAdmin = {}; // Limpa os dados do novo usuário
  }

  closeAddAdminPopup() {
    this.showAddAdminPopup = false; // Fecha o popup de adicionar usuário
    this.newUser = {}; // Limpa os dados do novo usuário
  }

  async createAdmin(){

    const loading = await this.loadingController.create();
    await loading.present();
    
    this.usersService.create(
      this.role = 2,
      this.name,
      this.email,
      this.phone,
      this.company,
      this.additionalEmails,
      this.mobilePhone,
      this.cpfCnpj,
      this.postalCode,
      this.address,
      this.addressNumber,
      this.complement,
      this.province,
      this.city,
      this.state,
      this.password,
      this.observations
     
    )
      .subscribe(
        response => {
          console.log('Admin criado com sucesso:', response);
          this.users.push(response); // Adiciona o novo usuário à lista
          this.closeAddAdminPopup(); // Fecha o popup de adicionar usuário
         // this.refreshPage()
        },
        error => {
          console.error('Erro ao criar admin:', error);
          this.alertController.create({
            header: 'Erro ao cadastrar admin',
            message: 'Reveja suas informações',
            buttons: ['OK']
          })
        }
      );
  }

  async createUser() {

    const loading = await this.loadingController.create();
    await loading.present();

    this.nameError = !this.name;
    this.emailError = !this.email;
    this.phoneError = !this.phone;
    this.cpfCnpjError = !this.cpfCnpj;
    this.mobilePhoneError = !this.mobilePhone;
    this.postalCodeError = !this.postalCode;
    this.addressError = !this.address;
    this.addressNumberError = !this.addressNumber;
    this.complementError = !this.complement;
    this.provinceError = !this.province;
    this.cityError = !this.city;
    this.stateError = !this.state;
    this.passwordError = !this.password;

    this.usersService.create(
      this.role,
      this.name,
      this.email,
      this.phone,
      this.company,
      this.additionalEmails,
      this.mobilePhone,
      this.cpfCnpj,
      this.postalCode,
      this.address,
      this.addressNumber,
      this.complement,
      this.province,
      this.city,
      this.state,
      this.password,
      this.observations
     
    )
      .subscribe(
        response => {
          loading.dismiss();
          console.log('Usuário criado com sucesso:', response);
          this.users.push(response); // Adiciona o novo usuário à lista
          this.closeAddUserPopup(); // Fecha o popup de adicionar usuário
          //this.refreshPage()
        },
        error => {
          loading.dismiss();
          console.error('Erro ao criar usuário:', error);
          this.alertController.create({
            header: 'Erro ao cadastrar usuário',
            message: 'Reveja suas informações',
            buttons: ['OK']
          })
        }
      );
  }

  editUser(user: any) {
    this.selectedUser = { ...user };
    this.showEditUserPopup = true; // Exibe o popup de edição de usuário
  }

  closeEditUserPopup() {
    this.showEditUserPopup = false; // Fecha o popup de edição de usuário
  }

  editAdmin(user: any) {
    this.selectedUser = { ...user };
    this.showEditAdminPopup = true; // Exibe o popup de edição de usuário
  }

  closeEditAdminPopup() {
    this.showEditAdminPopup = false; // Fecha o popup de edição de usuário
  }

  updateUser() {
    const userId = this.selectedUser.id; // ID do usuário a ser atualizado

    // Chame o serviço adequado para atualizar o usuário
    this.adminService.updateUser(userId, this.selectedUser)
      .subscribe(
        response => {
          //this.refreshPage()
          console.log('Usuário atualizado com sucesso:', response);
          this.closeEditUserPopup(); // Fecha o popup de edição de usuário
        },
        error => {
          console.error('Erro ao atualizar usuário:', error);
        }
      );
  }

  async deleteUser(index: number) {
    const alert = await this.alertController.create({
      header: 'Excluir Usuário',
      message: 'Tem certeza de que deseja excluir este usuário?',
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
        response => {
          console.log('Usuário excluído com sucesso:', response);
          // Remova o usuário excluído da lista de usuários exibida na tabela
          this.users.splice(index, 1);
        },
        error => {
          console.error('Erro ao excluir usuário:', error);
        }
      );
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

}
