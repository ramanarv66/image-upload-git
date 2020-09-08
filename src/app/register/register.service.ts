import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterRequest} from "../model/register-request";
import {Observable} from "rxjs";
import {RegisterResponse} from "../model/register-response";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(public http:HttpClient) { }


  register(registerRequest:RegisterRequest):Observable<RegisterResponse>{
    return this.http.post<RegisterResponse>(environment.registerUrl, registerRequest);
  }
}
