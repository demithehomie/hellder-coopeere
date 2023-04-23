import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-alterarsenha',
  templateUrl: './alterarsenha.page.html',
  styleUrls: ['./alterarsenha.page.scss'],
})
export class AlterarsenhaPage implements OnInit {

  constructor(
    private navCtrl:NavController
  ) { }

  ngOnInit() {
  }

  loginNavigate(){
    this.navCtrl.navigateForward('/login');
  }

}
