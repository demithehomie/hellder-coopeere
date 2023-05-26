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

  // Deletar usuário
  deleteUser(userId: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/users/${userId}`);
  }
}