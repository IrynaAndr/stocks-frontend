import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginregisterService } from '../loginregister.service';
import { SharedService } from '../shared.service';
import { User } from '../shared/user.module';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styles: [
  ]
})
export class TopMenuComponent implements OnInit {

  constructor(public service:LoginregisterService, private cookieService: CookieService, private service2:SharedService) { }

  ngOnInit(): void {
    
    this.getUserInfo();
  }
  UserCookieExists(){
    if(this.cookieService.check('UserId')){
    return true 
    }
    else{
    return false
    }
  }
  user:any=  {
    Id:0,
    Name:'',
    Type:0 
  };
  
  signout(){
    this.cookieService.delete('UserId');
    this.service.formData.password = '';
  }
  getUserInfo(){
    
    this.service.getUserInfo(this.cookieService.get('UserId')).subscribe(data=>{this.user=data; });
  }
  UserTypeNormal(){
    if(this.user.Type ==1){
      return true;
    }
    else{
      return false;
    }
  }

}
