import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

interface Cep {
  cep: string;
  logradouro: string;
  localidade: string;
  bairro: string;
  uf: string;
  ddd: string;
}

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {
  constructor(private http: HttpClient) { }

//   getAddressByCep(cep: string){

//   console.log(cep);

//   // Nova variável "cep" somente com dígitos.
//   cep = cep.replace(/\D/g, '');

//   // Verifica se campo cep possui valor informado.
//   if (cep !== '') {
//     // Expressão regular para validar o CEP.
//     const validacep = /^[0-9]{8}$/;

//     // Valida o formato do CEP.
//     if (validacep.test(cep)) {
//       return this.http.get(`//viacep.com.br/ws/${cep}/json`);
//     }
//   }

//   return of({});
// }

getCEP(cep: Cep):Observable<Cep>{
  return this.http.get<Cep>(`https://viacep.com.br/ws/${cep}/json/` );
}

}