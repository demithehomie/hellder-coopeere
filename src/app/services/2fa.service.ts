import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const APIUrl = "http://localhost:3001"

@Injectable({
    providedIn: 'root'
})
export class TwoFAService {

    authForm: FormGroup;

constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) {
    this.authForm = this.formBuilder.group({
        id: [null],
        emailVerificationCode: [null],
        verificationCode: [null]
      });
 }


startConfirmEmail() {
    const id = this.authForm.value.id;
    this.httpClient.post('http://localhost:3001/auth/start-confirm-email', id).subscribe(response => {
      console.log(response);
    });
  }

  confirmEmail() {
    const emailVerificationCode = this.authForm.value.emailVerificationCode;
    this.httpClient.post('/api/confirm-email', { emailVerificationCode }).subscribe(response => {
      console.log(response);
    });
  }

  startConfirmSMS() {
    const id = this.authForm.value.id;
    this.httpClient.post('/api/start-confirm-sms', id).subscribe(response => {
      console.log(response);
    });
  }

  confirmSMS() {
    const verificationCode = this.authForm.value.verificationCode;
    this.httpClient.post('/api/confirm-sms', { verificationCode }).subscribe(response => {
      console.log(response);
    });
  }




validateSMS(body: any): Observable<any>{
    return this.httpClient.post(APIUrl+'validarsms', body)
}



validateEmail(body: any): Observable<any>{
    return this.httpClient.post(APIUrl+'validaremail', body)
}


sendTheForgetEmail(email: any): Observable<any>{
    return this.httpClient.post(APIUrl+'/auth/forget', email)
}

sendTheNewPassword(emailVerification: { forgetVerificationCode: any, password: any}): Observable<any>{
    return this.httpClient.post(APIUrl+'/auth/reset', emailVerification)
}

}