import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SMS } from 'src/app/interfaces/sms';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.page.html',
  styleUrls: ['./sms.page.scss'],
})
export class SmsPage implements OnInit {

  constructor(private router: Router,
    private formBuilder: FormBuilder,) { }

  ngOnInit() {
  }


  sms: SMS = {
    code: ""
  }

  codigo!: FormGroup

  validaForm(){
    this.codigo = this.formBuilder.group({
      code: ['',[Validators.required]]
    })
  }

  validarCodigo(): void{
    const data = {
      code: this.sms.code
    }

  }

}
