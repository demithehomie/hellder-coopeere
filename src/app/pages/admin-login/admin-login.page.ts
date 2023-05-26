import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.page.html',
  styleUrls: ['./admin-login.page.scss'],
})
export class AdminLoginPage implements OnInit {

  email!: string;
  password!: string;

  constructor(
    private router: Router
  ) { }

  login() {
    if (this.email === 'helrov@hotmail.com' && this.password === 'tara9317') {
      // Autenticação bem-sucedida, redirecionar para a página principal
      this.router.navigate(['/admin-dashboard']);
    } else {
      // Exibir mensagem de erro de autenticação inválida
      console.log('Credenciais inválidas');
    }
  }

  ngOnInit() {
  }

}
