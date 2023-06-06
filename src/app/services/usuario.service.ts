import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable, catchError, map, of, throwError } from 'rxjs';


const base_URL = 'https://grandfinale.onrender.com';

@Injectable({
  providedIn: 'root' 
})
export class UsuarioService {
  //  base_URL: any;

 

  constructor(private httpClient: HttpClient) { }


  // SABER SE UM EMAIL É EXISTENTE OU NÃO

  verificarUsuarioExistente(email: string): Observable<any> {
    return this.httpClient.get(`${base_URL}/auth/get-by-email/${email}`).pipe(
      catchError((error) => {
        return throwError(error); // Lança o erro para ser tratado posteriormente
      })
    );
  }
  
  
  


  // CRIAR USUÁRIO - SELF-SIGN-IN 
  create(data: any) : Observable<any>  {
 
    
    return this.httpClient.post(base_URL+'/auth/register',data)
 
  }

  // AUTENTICAÇÃO COM GOOGLE (LOGIN)
  googleAuth(){
    return this.httpClient.get(base_URL+'/auth/google')
  }

  buscarCep(postalCode: string){
    return this.httpClient.get(`https://viacep.com.br/ws/${postalCode}/json/`)
  }


  // ENCONTRAR TODOS OS USUÁRIOS - SOMENTE ADMINS
  findAll() {
    return this.httpClient.get(base_URL);
  }

  // ENCONTRAR UM USUÁRIO - SOMENTE ADMINS
  findOne(data: any): Observable<any>{
    return this.httpClient.get(base_URL+':id', data);
  }

  // ATUALIZAR PARCIALMENTE - USUÁRIOS COM PERMISSÃO, E ADMINS
  updatePartial(data: any){
    return this.httpClient.patch(base_URL, data);
  }

  // ATUALIZAR COMPLETAMENTE - USUÁRIOS COM PERMISSÃO, E ADMINS
  update(data: any){
    return this.httpClient.put(base_URL, data);
  }

  // INICIAR CONFIRMAÇÃO DO SMS
  startConfirmByEmail(id: number) {
    return this.httpClient.post(`${base_URL}/auth/start-confirm-email`, id).toPromise();
  }

  // CONFIRMAR EMAIL DO USUÁRIO
  confirmEmail(emailVerificationCode: string): Observable<any>  {
    return this.httpClient.post(`${base_URL}/auth/confirm-email`, { emailVerificationCode }) //.toPromise();
  }

// INICIAR CONFIRMAÇÃO DO SMS
startConfirmSMS(id: number) {
  return this.httpClient.post(`${base_URL}/auth/start-confirm-sms`,  id ).toPromise();
}

  
// CONFIRMAR SMS DO USUÁRIO
confirmSMS(verificationCode: string): Observable<any> {
  return this.httpClient.post(`${base_URL}/auth/confirm-sms`,  { verificationCode })
}

  
  
  // DELETAR CONTA - USUÁRIOS COM PERMISSÃO, E ADMINS
  delete(data: any){
    return this.httpClient.delete(base_URL, data);
  }

  // autenticação -  - USUÁRIOS COM PERMISSÃO, E ADMINS
  login(body: any): Observable<any> {
    return this.httpClient.post(base_URL+'/auth/login', body);
  }

  // ESQUECI MINHA SENHA - SOMENTE USUÁRIOS
  forgotPassword(data: any){
    return this.httpClient.post(base_URL+'/forget', data)
  }

  // RESETAR SENHA - USUÁRIOS COM PERMISSÃO, E ADMINS
  resetarSenha(data: any){
    return this.httpClient.post(base_URL+'/reset', data)
  }

  // UPLOAD DE IMAGEM - foto de perfil (ADAPTAR PARA PRODIST PARA O UPLOAD DA CONTA DE LUZ (E TALVEZ))

  imageUpload(data: any){
    return this.httpClient.post(base_URL+'/file/photo', data)
  }

  // UPLOAD DE ARQUIVOS - SERÁ ESSE?
  fileUploads(data: any){
    return this.httpClient.post(base_URL+'/files/files', data)
  }




  //LOGOUT?



  //

  getData(data: any) {
    return this.httpClient.get(base_URL, data);
  }


  // 

 startSMSConfirmation(): Observable<any> {
    try {
      const response =  this.httpClient.post(`${base_URL}/auth/start-confirm-sms`, {} )//.toPromise();
      return response;
    } catch (error) {
      throw new Error('Falha ao iniciar a confirmação de SMS');
    }
  }

  startEmailConfirmation(): Observable<any> {
    try {
      const response = this.httpClient.post(`${base_URL}/auth/start-confirm-email`, {});
      console.log(response);
      return response;
    } catch (error) {
      throw new Error('Falha ao iniciar a confirmação de SMS');
    }
  }
  

 // response: any

  async verifySMSCode(verificationCode: string) {
    try {
     
        const response = await this.httpClient.post(`${base_URL}/auth/confirm-sms`, { verificationCode })//.toPromise();
        return response;
      } catch (error) {
        throw new Error('Falha ao verificar o código de verificação SMS');
      }
    }



  }





