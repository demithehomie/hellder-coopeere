import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const APIUrl = "http://localhost:3001"

@Injectable({
    providedIn: 'root'
})
export class TwoFAService {

constructor(private httpClient: HttpClient) { }

validateSMS(body: any): Observable<any>{
    return this.httpClient.post(APIUrl+'validarsms', body)
}



validateEmail(body: any): Observable<any>{
    return this.httpClient.post(APIUrl+'validaremail', body)
}


sendTheForgetEmail(email: any): Observable<any>{
    return this.httpClient.post(APIUrl+'/auth/forget', email)
}

sendTheNewPasswordEmail(emailVerification: {email: any, forgetVerificationCode: any}): Observable<any>{
    return this.httpClient.post(APIUrl+'/auth/reset', emailVerification)
}

}