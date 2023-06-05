import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

const clienteURL = 'http://localhost:3001';

@Injectable()
export class ProdistService {
    constructor( private httpClient: HttpClient) { }

    // CRIAR FORMULÁRIO PRODIST
    create(data: any): Observable<any>{
      return this.httpClient.post(clienteURL+'/prodist/criar',data)
    }

    enviarDadosTriagem(operadora: number, ehTitular: boolean): Observable<any> {
      const formData = {
        operadora: operadora,
        ehTitular: ehTitular
      };
  
      return this.httpClient.post(clienteURL+'/triagem/criar', formData);

    }

    enviarContaDeLuz(){
      
    }

    async obterDados(data: any){
      this.httpClient.get(clienteURL+'/usuarios/pdf-single', data)
    }

    async imprimirPdf(id: any, NumeroDoCliente: any){
      const data = { id: id, NumeroDoCliente: NumeroDoCliente }
       
      return this.obterDados(data)
    }

    // enviarDadosTriagem(: any){

    // }

    
}