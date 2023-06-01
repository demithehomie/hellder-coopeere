import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-novo-cadastro',
  templateUrl: './novo-cadastro.page.html',
  styleUrls: ['./novo-cadastro.page.scss'],
})
export class NovoCadastroPage implements OnInit {

  ngOnInit(): void {
    
  }

  cadastroForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      sexo: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cpf: ['', Validators.required],
      celular: ['', Validators.required],
      fixo: [''],
      senha: ['', Validators.required],
      confirmarSenha: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  cadastrar() {
    if (this.cadastroForm.valid) {
      // Realizar a lógica de envio dos dados para o banco de dados aqui
      const formData = this.cadastroForm.value;
      this.http.post('URL_DO_SEU_ENDPOINT', formData).subscribe(
        (response) => {
          // Lógica de sucesso do envio do formulário
          console.log('Formulário enviado com sucesso!', response);
        },
        (error) => {
          // Lógica de erro no envio do formulário
          console.error('Erro ao enviar o formulário', error);
        }
      );
    }
  }

}
