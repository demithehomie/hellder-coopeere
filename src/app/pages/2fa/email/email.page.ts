import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Email } from 'src/app/interfaces/email';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.page.html',
  styleUrls: ['./email.page.scss'],
})
export class EmailPage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private usuarioService: UsuarioService
  ) { }


email: Email = {
  code: ""
}



ngOnInit(): void{
  this.validaForm();

}


formulario!: FormGroup;

validaForm(){
  this.formulario = this.formBuilder.group({

    code: ['', [Validators.required]],
  });
}

equalTo(field_name: string) {
  return (control: any) => {
    const field = control.parent?.get(field_name);
    if (field && control.value !== field.value) {
      return { equalTo: true };
    }
    return null;
  };
}

confirmar(): void{
  
  const confirmation = {
    code: this.email.code,
    
  };
  this.usuarioService.create(confirmation).subscribe({next: (rescli) => 
    {
      console.log(rescli);
      console.log("Usuário com identidade confirmada com sucesso")
      this.navCtrl.navigateForward('/email');
    },
    error: (e) => console.error(e)
    });
}

  
}
