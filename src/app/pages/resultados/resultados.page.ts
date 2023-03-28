import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterPipe } from 'src/app/pipes/filter.pipes';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage {

  constructor(private route: ActivatedRoute, private searchService: SearchService ) {}

 pesquisaPagina: any;
 conteudo: any[] | undefined;
  filtros: any;
  conteudoFiltrado: any[] | undefined;

  searchTerm: string = '';

 pages /*:  { id: number, nome: string, titulo: string, conteudo: string }[] */ = [
  {
    id: 0,
    nome: "Eventos",
    titulo: "Eventos",
    conteudo: "Não temos Eventos realizados ou agendados ainda. Tão logo sejam agendados, serão divulgados aqui"
  },

{
  
    id: 1,
    nome: "Agenda",
    titulo: "VII CONGRESSO DE ENSINO, PESQUISA E EXTENSÃO (CONEPE)",
    conteudo: "Prezados Congressistas,  O Instituto Federal Fluminense campus Campos Guarus realizará o VII CONGRESSO DE ENSINO, PESQUISA E EXTENSÃO (CONEPE) com o tema “Educação e Sociedade: A Nova Fronteira da Ciência”, transmitido pelo canal do campus: IFF Tube Campus Guarus, no período de 23 a 27 de novembro de 2020. O evento será constituído de Webinares no formato de palestras, mesa redondas, minicursos, oficinas, apresentações de resumos acadêmicos no formato oral e vídeo-pôsteres, além do Desafio CONEPE de Criatividade e Inovação prático, propiciando a discussão de temas relevantes para a construção e difusão de conhecimentos em nosso País. As submissões dos trabalhos ocorrerão entre os dias 08 de setembro a 08 de outubro de 2020. As inscrições para Minicursos e Oficinas serão realizadas entre os dias 09 e 20 de novembro de 2020. Confira a programação completa no site do evento http://conepe.guarus.iff.edu.br/programacao. Aproveitamos a oportunidade para solicitar a ampla divulgação do evento. Comissão Organizadora do IV Congresso de Ensino, Pesquisa e Extensão (CONEPE)  Instituto Federal Fluminense campus Campos Guarus"
  
},

{
  id: 2,
  nome: "Agenda",
  titulo: "VI CONGRESSO DE ENSINO, PESQUISA E EXTENSÃO(CONEPE)",
  conteudo: ""
},

{
  id: 3,
  nome: "Agenda",
  titulo: "V CONGRESSO DE ENSINO, PESQUISA E EXTENSÃO(CONEPE)",
  conteudo: ""
},

{
  id: 4,
  nome: "Agenda",
  titulo: "Wind Farm & Ind. Eólica Offshore",
  conteudo: ""
},

{
  id: 5,
  nome: "Agenda",
  titulo: "CONGRESSO LATINO AMERICANO DE DIREITO",
  conteudo: ""
},

]

ngOnInit() {
  // Obtém os filtros da query string da URL
  this.route.queryParams.subscribe(params => {
    this.filtros = params;
    // Filtra o array de conteúdo com os filtros
  //  this.conteudo = this.filtrarConteudo(this.filtros);
  });
}

/*
getFilteredItems() {
  return this.pages.filter(page => {
    return (
      page.nome.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ||
      page.titulo.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ||
      page.conteudo.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
    );
  });
}

*/

getFilteredItems() {
  const searchTerm = this.searchService.searchTerm;
  if (!searchTerm) {
    return this.pages;
  }
  return this.pages.filter(page => {
    return page.nome.includes(searchTerm);
  });
}


}
