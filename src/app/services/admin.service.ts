import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class AdminService {

    private apiUrl = 'http://localhost:3001';

    constructor (
        private httpClient: HttpClient
    ) {}

    // Criar usuário
  createUser(user: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/users`, user);
  }

  // Editar usuário
  editUser(userId: number, updatedUser: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/users/${userId}`, updatedUser);
  }

  updateUser(userId: number, userData: any) {
    const url = `${this.apiUrl}/users/${userId}`; // Substitua "users" pelo endpoint correto da sua API

    return this.httpClient.put(url, userData);
  }

  // Deletar usuário
  deleteUser(userId: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/users/${userId}`);
  }

  showUsers(){
    return this.httpClient.get(`${this.apiUrl}/users`)
  }
}