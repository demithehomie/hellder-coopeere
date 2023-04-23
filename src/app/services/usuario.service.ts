import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';


const usuarioURL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) { }

  // CRIAR USUÁRIO - SELF-SIGN-IN 
  create(data: any): Observable<any>{
    // return this.httpClient.post(usuarioURL+'/users',data)
     return this.httpClient.post('http://localhost:3000/users',data)
  }

  buscarCep(postalCode: string){
    return this.httpClient.get(`https://viacep.com.br/ws/${postalCode}/json/`)
  }


  // ENCONTRAR TODOS OS USUÁRIOS - SOMENTE ADMINS
  findAll() {
    return this.httpClient.get(usuarioURL);
  }

  // ENCONTRAR UM USUÁRIO - SOMENTE ADMINS
  findOne(data: any): Observable<any>{
    return this.httpClient.get(usuarioURL+':id', data);
  }

  // ATUALIZAR PARCIALMENTE - USUÁRIOS COM PERMISSÃO, E ADMINS
  updatePartial(data: any){
    return this.httpClient.patch(usuarioURL, data);
  }

  // ATUALIZAR COMPLETAMENTE - USUÁRIOS COM PERMISSÃO, E ADMINS
  update(data: any){
    return this.httpClient.put(usuarioURL, data);
  }

  // CONFIRMAR EMAIL DO USUÁRIO
  confirmEmail(data: any){
    return this.httpClient.post(usuarioURL + '/auth/confirm-email', data)
  }
// CONFIRMAR EMAIL DO USUÁRIO
confirmSMS(data: any){
  return this.httpClient.post(usuarioURL + '/auth/confirm-sms', data)
}

  
  
  // DELETAR CONTA - USUÁRIOS COM PERMISSÃO, E ADMINS
  delete(data: any){
    return this.httpClient.delete(usuarioURL, data);
  }

  // autenticação -  - USUÁRIOS COM PERMISSÃO, E ADMINS
  login(body: any): Observable<any> {
    return this.httpClient.post(usuarioURL+'/auth/login', body);
  }

  // ESQUECI MINHA SENHA - SOMENTE USUÁRIOS
  forgotPassword(data: any){
    return this.httpClient.post(usuarioURL+'/forget', data)
  }

  // RESETAR SENHA - USUÁRIOS COM PERMISSÃO, E ADMINS
  resetarSenha(data: any){
    return this.httpClient.post(usuarioURL+'/reset', data)
  }

  // UPLOAD DE IMAGEM - foto de perfil (ADAPTAR PARA PRODIST PARA O UPLOAD DA CONTA DE LUZ (E TALVEZ))

  imageUpload(data: any){
    return this.httpClient.post(usuarioURL+'/file/photo', data)
  }

  // UPLOAD DE ARQUIVOS - SERÁ ESSE?
  fileUploads(data: any){
    return this.httpClient.post(usuarioURL+'/files/files', data)
  }




  //LOGOUT?



  //

  getData(data: any) {
    return this.httpClient.get(usuarioURL, data);
  }


  // 


}
