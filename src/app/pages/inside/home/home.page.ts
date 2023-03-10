import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  data: any;
  selectedTab: string = "option1";

  constructor(private usuarioService: UsuarioService, private alertController: AlertController) { }

  ngOnInit() {
    this.usuarioService.getData(this.data).subscribe(data => {
      this.data = data;
    });
  }

  

  nextPage() {
    if (this.selectedTab === 'option1') {
      this.selectedTab = 'option2';
    } else if (this.selectedTab === 'option2') {
      this.selectedTab = 'option3';
    } else if (this.selectedTab === 'option3') {
      this.selectedTab = 'option4';
    } else if (this.selectedTab === 'option4') {
      this.selectedTab = 'option5';
    } else if (this.selectedTab === 'option5') {
      this.selectedTab = 'option6';
    } else if (this.selectedTab === 'option6') {
      this.selectedTab = 'option7';
    }

  }

  previousPage() {
    if (this.selectedTab === 'option7'){
      this.selectedTab = 'option6';
    } else if (this.selectedTab === 'option6'){
      this.selectedTab = 'option5';
    } else if (this.selectedTab === 'option5'){
      this.selectedTab = 'option4';
    } else if (this.selectedTab === 'option4'){
      this.selectedTab = 'option3';
    } else if (this.selectedTab === 'option3'){
      this.selectedTab = 'option2';
    } else if (this.selectedTab === 'option2'){
      this.selectedTab = 'option1';
    }




  }

  async alertaDeSaida() {
    const alert = await this.alertController.create({
      header: 'Tem certeza?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Não',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Sim',
          cssClass: 'alert-button-confirm',
          
        },
      ],
    });

    await alert.present();
  }

}
