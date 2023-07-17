import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { Title } from '@angular/platform-browser';
import { NewAppStorageService } from 'src/app/services/new-app-storage.service';
import { IonSlides, IonicSlides, ModalController } from '@ionic/angular';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html', 
  
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit  {

  swiperModules = [IonicSlides];

  private swiper?: Swiper;

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;

  isDropdownOpen: boolean = false;

  /////////////////////////////////////////////////////////////

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  pesquisaPagina: any;

  filtros: any;

  showMenu: boolean = false;

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  
closeSearchInput(){
  this.router.navigateByUrl('/onboarding')
}


 
  slideOpts = {
    autoplay: {
      delay: 6000
    },
    loop: true
  };


  slideOpts2 = {
    autoplay: {
      delay: 4000
    },
    slidesPerView: 5,
    spaceBetween: 10,
    loop: true
  };

  searchTerm: string = "";
  selectedOption: string = '';
 
  constructor(
    private router: Router,
    private localStorage: LocalStorage,
    private searchService: SearchService,
    private titleController: Title,
    private appStorageService: NewAppStorageService
    ) {
      this.titleController.setTitle('Home - Coopeere')
    }

    pesquisa: any

    searchFunction(pesquisa: any){
      this.appStorageService.set(`pesquisa`, `${pesquisa}`)
    }


    /////////// opa opa opa

    ionViewDidEnter() {
      //this.refreshPage();
    
      setInterval(() => {
        this.refreshPage();
      }, 1 * 60 * 1000); // Executa a cada 1 minuto (1 minutos * 60 segundos * 1000 milissegundos)
    }
    
    refreshPage() {
      window.location.reload();
    }
    

    search() {
      this.searchService.searchTerm = this.searchTerm;
      //this.appStorageService.set(`pesquisa`, this.searchTerm)
      this.router.navigate(['/resultados']);
    }

    async clearCache(){
      await this.localStorage.clear().toPromise()
    }

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




ngOnInit(): void{

}


}