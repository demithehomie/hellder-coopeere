
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';

import { Preferences } from '@capacitor/preferences';

//const TOKEN_KEY = 'my-token';

const baseApiUrl = 'https://grandfinale.onrender.com'

@Injectable({
    providedIn: 'root'
})

export class PaymentService {

    constructor(private httpClient: HttpClient){}

    makeThePayment(credentials: 
        { 
            email: any; 
            password: any;

        }): Observable<any> {
        console.log(credentials)
        return this.httpClient.post(`${baseApiUrl}/payments`, credentials)// .pipe(
        //     map((data: any) => data.token),
        //     switchMap((token) => {
        //         return from(Preferences.set({ key: TOKEN_KEY, value: token }));
        //     }),
        //     tap((_) => {
        //         this.isAuthenticated.next(true);
        //     })
        // );
    }

}