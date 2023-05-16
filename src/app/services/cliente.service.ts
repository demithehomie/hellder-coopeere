import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { Cliente } from '../interfaces/cliente';
import { Usuario } from '../interfaces/usuario';


const clienteURL = 'http://localhost:3001';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  private user$ = new BehaviorSubject<Usuario | null>(null);

  private httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  get userFullName(): Observable<string | null | undefined> {
    return this.user$.asObservable().pipe(
      switchMap((user: Usuario | null) => {
        if (!user) {
          return of(null);
        }
        const fullName = user.name // + ' ' + user.lastName;
        return of(fullName);
      })
    );
  }

  constructor( private httpClient: HttpClient) { }

  // CRIAR CLIENTES - AUTOMÁTICO NO SELF-SIGN-IN
  create(datacliente: any): Observable<any>{
    return this.httpClient.post(clienteURL+'/customers',datacliente)
  }

  getUser(customerID: string){
    return this.httpClient.get(clienteURL + '/users/' + `${customerID}` )
  }

  // ????
  findAll() {
    return this.httpClient.get(clienteURL+'listar');
  }

  // LOGAR CLIENTE - ????
  login(body: any): Observable<any> {
    return this.httpClient.post(clienteURL+'login', body);
  }

  // GERAR COBRANÇA
  generateInvoice(datapayment: any){
    return this.httpClient.post(clienteURL+'/payments ', datapayment); 
  }

  // CRIAR ASSINATURA (BOLETO OU PIX)
  generateSubs(body: any){
    return this.httpClient.post(clienteURL+'/subscriptions', body); 
  }

  // CRIAR ASSINATURA (CARTÃO DE CRÉDITO)
  generateSubsCard(body: any){
    return this.httpClient.post(clienteURL+'/subscriptions', body); 
  }

  // GERAR LINK DE PAGAMENTO 
  generatePaymentLink(body: any){
    return this.httpClient.post(clienteURL+'/paymentLinks', body); 
  }

  // OBTER O ID DE CLIENTES DO USUÁRIO ASAAS
  getCustomerId(){
    return this.httpClient.get(clienteURL+'/customers ')
  }

  getCpfCnpj(id: string){
    //const id = response.data.id;
    return this.httpClient.get(clienteURL+`/customers/customers_from_database_by_id/${id}`)
  }


  

}
