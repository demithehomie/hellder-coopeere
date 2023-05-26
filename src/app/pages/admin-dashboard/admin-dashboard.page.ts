import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {
  users: any[] = []; // Initialize users as an empty array

  constructor(private adminService: AdminService) {}

 // users
 
// users = this.adminService.showUsers()
  
  selectedUser: any = null;

  selectUser(user: any) {
    this.selectedUser = user;
  }

  closePopup() {
    this.selectedUser = null;
  }

  addUser(){

  }




  criarUsuario() {
    const novoUsuario = { nome: 'João', email: 'joao@example.com' };
    this.adminService.createUser(novoUsuario)
      .subscribe(
        response => {
          console.log('Usuário criado com sucesso:', response);
        },
        error => {
          console.error('Erro ao criar usuário:', error);
        }
      );
  }

  editUser() {
    const usuarioAtualizado = { nome: 'Maria', email: 'maria@example.com' };
    const userId = 1; // ID do usuário a ser editado
    this.adminService.editUser(userId, usuarioAtualizado)
      .subscribe(
        response => {
          console.log('Usuário editado com sucesso:', response);
        },
        error => {
          console.error('Erro ao editar usuário:', error);
        }
      );
  }

  deleteUser(index: number) {
    const userId = 1; // ID do usuário a ser deletado
    this.adminService.deleteUser(userId)
      .subscribe(
        response => {
          console.log('Usuário deletado com sucesso:', response);
        },
        error => {
          console.error('Erro ao deletar usuário:', error);
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
