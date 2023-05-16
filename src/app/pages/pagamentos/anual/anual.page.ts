import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AppStorageService } from 'src/app/services/app-storage.service';

@Component({
  selector: 'app-anual',
  templateUrl: './anual.page.html',
  styleUrls: ['./anual.page.scss'],
 // standalone: true,
 // imports: [IonicModule]
})
export class AnualPage  {

  value: any="";
  

  constructor( 
    private appStorageService: AppStorageService
  ) { }

  async setValue() {
    await this.appStorageService.set('testando', '123')
  }

  async getValue() {
    this.value = await this.appStorageService.get('testando')
  }

  async removeValue(){
    await this.appStorageService.remove('testando')
  }

  async clearStorage(){
    await this.appStorageService.clear()
  }
}
