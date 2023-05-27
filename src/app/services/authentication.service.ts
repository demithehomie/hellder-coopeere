	import { Injectable } from '@angular/core';
	import { HttpClient } from '@angular/common/http';
	import { map, tap, switchMap } from 'rxjs/operators';
	import { BehaviorSubject, from, Observable, Subject } from 'rxjs';

	import { Preferences } from '@capacitor/preferences';


	const TOKEN_KEY = 'my-token';
	const baseApiUrl = 'https://grandfinale.onrender.com'
	@Injectable({
		providedIn: 'root'
	})
	export class AuthenticationService {
		// Init with null to filter out the first value in a guard!
		isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
		isAdminAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
		token!: string | null ;

		constructor(private http: HttpClient) {
			this.loadToken();
			this.loadTokenAdmin();
		}

		async loadToken() {
			try {
				const token = await Preferences.get({ key: TOKEN_KEY });
				if (token !== undefined && token.value !== undefined) {
					console.log('set token: ', token.value);
					this.token = token.value;
					this.isAuthenticated.next(true);
				} else {
					this.isAuthenticated.next(false);
				}
			} catch (err) {
				console.error('Erro ao carregar token:', err);
				this.isAuthenticated.next(false);
			}
		}

		async loadTokenAdmin() {
			try {
				const token = await Preferences.get({ key: TOKEN_KEY });
				if (token !== undefined && token.value !== undefined) {
					console.log('set token: ', token.value);
					this.token = token.value;
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
				map((data: any) => data.token),
				switchMap((token) => {
					return from(Preferences.set({ key: TOKEN_KEY, value: token }));
				}),
				tap((_) => {
					this.isAuthenticated.next(true);
				})
				
			);
		
		}

		logout(): Promise<void> {
			this.isAuthenticated.next(false);
			return Preferences.remove({ key: TOKEN_KEY });
		}

		loginSimplificado(credentials: { email: any; password: any }){
			return this.http.post(`${baseApiUrl}/auth/login`, credentials)
		}
	}