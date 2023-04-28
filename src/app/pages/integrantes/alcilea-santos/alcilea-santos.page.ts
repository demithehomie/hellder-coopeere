import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-alcilea-santos',
  templateUrl: './alcilea-santos.page.html',
  styleUrls: ['./alcilea-santos.page.scss'],
})
export class AlcileaSantosPage implements OnInit {

  selectedOption: string;

  showMenu: boolean = false;

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }
  
  constructor(private navCtrl: NavController, private titleService: Title) {
    this.selectedOption = 'quemsomos';
    this.selectedOption = 'objetivos';
    this.selectedOption = 'equipe';
    this.titleService.setTitle('Alciléa dos Santos Ricardo do Rosário')
  }


  onOptionSelected(option: string) {
    this.selectedOption = option;
    switch (option) {
      case 'quemsomos':
        this.navCtrl.navigateForward('/quemsomos');
        break;
      case 'objetivos':
        this.navCtrl.navigateForward('/objetivos');
        break;
      case 'equipe':
        this.navCtrl.navigateForward('/equipe');
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

ngOnInit(): void{

}


}
