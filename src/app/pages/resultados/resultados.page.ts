import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage {

 // constructor() { }

 // ngOnInit() {
 // }

 paginas = [
  {
    id: 1,
    titulo: "Eventos",
    conteudo: "Não temos Eventos realizados ou agendados ainda. Tão logo sejam agendados, serão divulgados aqui"
  },
  {
    id: 2,
    titulo: "",
    conteudo: ""
  },
  {
    id: 3,
    titulo: "",
    conteudo: ""
  },

]

}
