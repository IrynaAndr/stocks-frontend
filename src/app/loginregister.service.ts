import { Injectable } from '@angular/core';
import { User } from './shared/user.module';
import {HttpClient} from "@angular/common/http";

import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginregisterService {

  constructor(private http:HttpClient, private cookieService:CookieService) { }

  formData:User = new User(); 
  formDatalogin:User = new User(); 
  

  readonly baseUrl= 'https://localhost:44327/api';
  readonly baseUrlLogin= 'https://localhost:44327/api/LoginRegister';
  readonly baseUrlRegister= 'https://localhost:44327/api/LoginRegister/register';
  readonly ApiUrl="https://localhost:44327/api";

  updateUserinfo(val:any){
    return this.http.put(this.ApiUrl+'/User',val);
  }

  postRegister(){
    return this.http.post(this.baseUrlRegister, this.formData);
    
  }
  postLogin(){
    return this.http.post(this.baseUrlLogin, this.formData);
    
  }

  getUserInfo(id:string){
    return this.http.get(this.ApiUrl+'/User/'+id);
  }
  

}
