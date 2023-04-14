import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';


const clienteURL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private httpClient: HttpClient) { }

  // CRIAR CLIENTES - AUTOMÁTICO NO SELF-SIGN-IN
  create(datacliente: any): Observable<any>{
    return this.httpClient.post(clienteURL+'/customers',datacliente)
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
}
