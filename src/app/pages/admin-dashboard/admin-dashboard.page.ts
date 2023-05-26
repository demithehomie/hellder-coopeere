import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {

  constructor(private adminService: AdminService) {}

  users = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123456789',
      company: 'Example Company',
      additionalEmails: ['john.doe@example.com', 'johndoe@example.com'],
      mobilePhone: '987654321',
      cpfCnpj: '1234567890',
      postalCode: '12345',
      address: '123 Example Street',
      addressNumber: '1',
      complement: 'Apartment 2B',
      province: 'Example Province',
      city: 'Example City',
      state: 'Example State',
      password: 'password123',
      observations: 'Example observations'
    },
    // Add more user objects as needed
  ];

  selectedUser: any = null;

  selectUser(user: any) {
    this.selectedUser = user;
  }

  closePopup() {
    this.selectedUser = null;
  }

  addUser(){

  }

  editUser(){

  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
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

  editarUsuario() {
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

  deletarUsuario() {
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
  }

}
