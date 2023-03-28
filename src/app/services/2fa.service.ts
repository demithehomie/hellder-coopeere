import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const APIUrl = "https://localhost:3000"

@Injectable()
export class TwoFAService {

constructor(private httpClient: HttpClient) { }

validateSMS(body: any): Observable<any>{
    return this.httpClient.post(APIUrl+'validarsms', body)
}

validateEmail(body: any): Observable<any>{
    return this.httpClient.post(APIUrl+'validaremail', body)
}

}