import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonItem } from '@ionic/angular';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.page.html',
  styleUrls: ['./publicacoes.page.scss'],
})
export class PublicacoesPage  {



  isOpen = false;


  selectedOption: string = '';

  showMenu: boolean = false;

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  
closeSearchInput(){
  this.router.navigateByUrl('/onboarding')
}
 
 
  constructor(private router: Router) {}

  goToPage(option: string) {
    switch (option) {
      case 'option1':
        this.router.navigateByUrl('/option1');
        break;
      case 'option2':
        this.router.navigateByUrl('/option2');
        break;
      case 'option3':
        this.router.navigateByUrl('/option3');
        break;
      default:
        break;
    }

  }

openExternalLinkFacebook(){
  window.open('https://www.facebook.com', '_blank')
}

openExternalLinkInstagram(){
  window.open('https://www.instagram.com', '_blank')
}

openExternalLinkYouTube(){
  window.open('https://www.youtube.com', '_blank')
}


downloadTeseMarcelo() {
  window.open('http://cresesb.cepel.br/publicacoes/download/tese/200704_dutra_r_m_dr.pdf', '_blank')
}

downloadSistemaDeGeracao(){
  window.open('https://www.way2.com.br/blog/geracao-distribuida/', '_blank')
}

downloadMonografiaMarciel(){
  window.open('https://www.coopeere.eco.br/wp-content/uploads/2021/01/Monografia_UENF_Marciel_2018.pdf','_blank')
}

downloadMonografiaPolyana(){
  window.open('https://www.coopeere.eco.br/wp-content/uploads/2021/01/Monografia_UENF_Pollyana_2019.pdf','_blank')
}

downloadMonografiaThamires(){
  window.open('https://www.coopeere.eco.br/wp-content/uploads/2021/01/Monografia_UENF_Thamires_2019.pdf','_blank')
}

// Função que verifica se o accordion está aberto





}
