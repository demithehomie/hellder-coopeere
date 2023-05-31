import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthenticationService, private router: Router) {}
  canLoad(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      filter(val => val !== null),
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        } else {
          const token = this.authService.token;
          if (token !== null) {
            // Se o token estiver presente, consideramos o usuário autenticado
            this.authService.isAuthenticated.next(true);
            //this.router.navigateByUrl('/home');
            return true;
          } else {
            // Se o token não estiver presente, redirecionamos para a página de login
            this.router.navigateByUrl('/login');
            return false;
          }
        }
      })
    );
  }
}
