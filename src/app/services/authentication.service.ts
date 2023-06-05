import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, from } from 'rxjs';

import { NewAppStorageService } from './new-app-storage.service';
import { Router } from '@angular/router';

const TOKEN_KEY = 'token';
const baseApiUrl = 'http://localhost:3001';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAdminAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  token: string | null = null;

  constructor(
    private http: HttpClient,
    private appStorageService: NewAppStorageService,
	private router: Router
  ) {
    this.loadToken();
    this.loadTokenAdmin();
  }

  async loadToken() {
    try {
      const token = await this.appStorageService.get(TOKEN_KEY);
      if (token !== null && token !== undefined	) {
		//this.router.navigateByUrl('/home');

        console.log('set token: ', token);
        this.token = token;
        this.isAuthenticated.next(true);
      } else {
		this.router.navigateByUrl('/login');
        this.isAuthenticated.next(false);
      }
    } catch (err) {
      console.error('Erro ao carregar token:', err);
      this.isAuthenticated.next(false);
    }
  }

  async loadTokenAdmin() {
    try {
      const token = await this.appStorageService.get(TOKEN_KEY);
      if (token !== null) {
        console.log('set token: ', token);
	//	this.router.navigateByUrl('/home');
        this.token = token;
        this.isAdminAuthenticated.next(true);
      } else {
        this.isAdminAuthenticated.next(false);
      }
    } catch (err) {
      console.error('Erro ao carregar token:', err);
      this.isAdminAuthenticated.next(false);
    }
  }

  login(credentials: { email: any; password: any }): Observable<any> {
    return this.http.post(`${baseApiUrl}/auth/login`, credentials).pipe(
      switchMap((response: any) => {
        const accessToken = response.accessToken;
        return from(this.appStorageService.set(TOKEN_KEY, accessToken)).pipe(
          map(() => response)
        );
      }),
      tap((response) => {
        this.isAuthenticated.next(true); // Defina isAuthenticated como true
      })
    );
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false)
	
    return this.appStorageService.remove(TOKEN_KEY);
	
  }

  loginSimplificado(credentials: { email: any; password: any }) {
    return this.http.post(`${baseApiUrl}/auth/login`, credentials);
  }
}
