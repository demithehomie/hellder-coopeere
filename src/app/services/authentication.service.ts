	import { Injectable } from '@angular/core';
	import { HttpClient } from '@angular/common/http';
	import { map, tap, switchMap } from 'rxjs/operators';
	import { BehaviorSubject, from, Observable, Subject } from 'rxjs';

	import { Preferences } from '@capacitor/preferences';


	const TOKEN_KEY = 'my-token';
	const baseApiUrl = 'http://localhost:3001'
	@Injectable({
		providedIn: 'root'
	})
	export class AuthenticationService {
		// Init with null to filter out the first value in a guard!
		isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
		token!: string | null ;

		constructor(private http: HttpClient) {
			this.loadToken();
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
		login(credentials: { email: any; password: any }): Observable<any> {
			console.log(credentials)
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
	}